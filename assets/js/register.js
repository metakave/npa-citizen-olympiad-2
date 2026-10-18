/* Registration flow: validate → issue application ID → optional POST to endpoint.
   With no endpoint configured the application is stored in this browser only
   (pilot mode), which is stated plainly on the confirmation screen. */
(function () {
  "use strict";

  var form = document.getElementById("reg-form");
  if (!form) return;

  var cfg = window.GCO_CONFIG || {};
  var success = document.getElementById("reg-success");
  var statusEl = document.getElementById("reg-status");
  var submitBtn = document.getElementById("reg-submit");
  var formWrap = document.getElementById("reg-form-wrap");
  var EVENT_DATE = new Date("2027-01-09T00:00:00+06:00");
  var bn = window.toBn || function (n) { return String(n); };

  function fieldEl(name) { return form.querySelector('[name="' + name + '"]'); }

  function setError(name, message) {
    var el = fieldEl(name);
    if (!el) return false;
    var wrap = el.closest(".field") || el.closest(".check");
    if (!wrap) return false;
    wrap.classList.toggle("has-error", !!message);
    var err = wrap.querySelector(".err");
    if (err) err.textContent = message || "";
    el.setAttribute("aria-invalid", message ? "true" : "false");
    return !!message;
  }

  function ageAt(dobStr, when) {
    var d = new Date(dobStr + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    var age = when.getFullYear() - d.getFullYear();
    var m = when.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && when.getDate() < d.getDate())) age -= 1;
    return age;
  }

  function collect() {
    var data = {};
    ["name", "phone", "email", "dob", "gender", "institution", "area", "source", "membership"].forEach(function (k) {
      var el = fieldEl(k);
      data[k] = el ? String(el.value || "").trim() : "";
    });
    var cityEl = form.querySelector('input[name="city"]:checked');
    data.city = cityEl ? cityEl.value : "";
    data.consent = !!(fieldEl("consent") && fieldEl("consent").checked);
    data.truth = !!(fieldEl("truth") && fieldEl("truth").checked);
    data.ambassador = !!(fieldEl("ambassador") && fieldEl("ambassador").checked);
    return data;
  }

  function validate(data) {
    var errors = [];
    if (data.name.length < 3) errors.push(["name", "পুরো নাম লিখুন (কমপক্ষে ৩ অক্ষর)।"]);
    else setError("name", "");

    var phone = data.phone.replace(/[\s\-()]/g, "").replace(/^\+?88/, "");
    if (!/^01[3-9]\d{8}$/.test(phone)) errors.push(["phone", "সঠিক মোবাইল নম্বর দিন—যেমন 01XXXXXXXXX।"]);
    else { setError("phone", ""); data.phone = phone; }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      errors.push(["email", "ইমেইলের ঠিকানাটি সঠিক নয়।"]);
    } else setError("email", "");

    var age = data.dob ? ageAt(data.dob, EVENT_DATE) : null;
    if (age === null) errors.push(["dob", "জন্মতারিখ দিন।"]);
    else if (age < 16) errors.push(["dob", "২০২৭ সালের ৯ জানুয়ারি তুমি কমপক্ষে ১৬ বছর হতে হবে।"]);
    else if (age > 30) errors.push(["dob", "এই আসর ১৬–৩০ বছর বয়সীদের জন্য।"]);
    else setError("dob", "");

    if (!data.city) errors.push(["city", "শহর নির্বাচন করুন—ঢাকা অথবা চট্টগ্রাম।"]);
    else setError("city", "");

    if (!data.consent) errors.push(["consent", "শর্ত ও গোপনীয়তা নীতিতে সম্মতি দিতে হবে।"]);
    else setError("consent", "");
    if (!data.truth) errors.push(["truth", "তথ্যের সত্যতার ঘোষণায় টিক দিন।"]);
    else setError("truth", "");

    if (!data.institution) errors.push(["institution", "শিক্ষাপ্রতিষ্ঠান বা পেশা লিখুন।"]);
    else setError("institution", "");

    errors.forEach(function (pair) { if (pair[1]) setError(pair[0], pair[1]); });
    return errors;
  }

  function makeId(city) {
    var prefix = city === "চট্টগ্রাম" ? "CTG" : "DHK";
    var used = JSON.parse(localStorage.getItem("gco_registrations") || "[]");
    var id;
    do {
      id = "GCO27-" + prefix + "-" + String(Math.floor(1000 + Math.random() * 9000));
    } while (used.some(function (r) { return r.id === id; }));
    return id;
  }

  function membershipText(v) {
    if (v === "yes") return "হ্যাঁ, সদস্যপদ নিতে আগ্রহী";
    if (v === "later") return "পরে ভাবব";
    return "শুধু অলিম্পিয়াডে অংশ নিতে চাই";
  }

  function showSuccess(record, localOnly) {
    formWrap.hidden = true;
    success.classList.add("is-visible");
    success.innerHTML =
      '<div class="ticket">' +
      '<p class="t-kicker">আবেদন গৃহীত · সুনাগরিক অলিম্পিয়াড</p>' +
      '<p class="t-id">' + record.id + "</p>" +
      '<p class="t-name">' + record.name + " · " + record.city + "</p>" +
      "<dl>" +
      "<dt>অনলাইন রাউন্ড</dt><dd>" + (cfg.onlineRoundLabel || "৯ জানুয়ারি ২০২৭") + "</dd>" +
      "<dt>মোবাইল</dt><dd>" + record.phone + "</dd>" +
      "<dt>সদস্যপদ</dt><dd>" + membershipText(record.membership) + "</dd>" +
      (record.ambassador ? "<dt>ক্যাম্পাস অ্যাম্বাসেডর</dt><dd>আগ্রহ প্রকাশ করেছেন</dd>" : "") +
      "</dl>" +
      "</div>" +
      (localOnly ? '<p class="form-note" style="margin-top:12px">পাইলট মোড: এই আবেদনটি কেবল এই ব্রাউজারে সংরক্ষিত হয়েছে। লাইভ করার আগে <code>assets/js/config.js</code>-এ ফর্ম এন্ডপয়েন্ট বসালে আবেদন সরাসরি অফিসে পৌঁছাবে।</p>' : "") +
      '<div class="quiz-actions" style="margin-top:20px">' +
      '<a class="btn btn-primary" href="' + (cfg.membershipUrl || "https://ournpa.org/membership") + '" target="_blank" rel="noopener">সদস্যপদ ফর্ম পূরণ করুন →</a>' +
      '<button type="button" class="btn btn-ghost" id="reg-print">আবেদনপত্র প্রিন্ট/সেভ</button>' +
      "</div>" +
      '<p class="form-note" style="margin-top:12px">আইডি নম্বরটি সংরক্ষণ করুন। প্রবেশপত্র ও ফলাফল এই আইডি দিয়ে যাচাই হবে। ' +
      '<button type="button" class="linkish" id="reg-again">নতুন আবেদন</button></p>';

    document.getElementById("reg-print").addEventListener("click", function () { window.print(); });
    document.getElementById("reg-again").addEventListener("click", function () {
      success.classList.remove("is-visible");
      success.innerHTML = "";
      formWrap.hidden = false;
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "আবেদন জমা দিন";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // wait one frame so the hidden form's height is gone before scrolling
    requestAnimationFrame(function () {
      setTimeout(function () {
        success.scrollIntoView({ behavior: "auto", block: "start" });
      }, 40);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;

    var data = collect();
    var errors = validate(data);
    if (errors.length) {
      statusEl.className = "form-status is-error";
      statusEl.textContent = "কয়েকটি তথ্য ঠিক করতে হবে — চিহ্নিত ঘরগুলো দেখুন।";
      var first = fieldEl(errors[0][0]);
      if (first) first.focus();
      return;
    }
    statusEl.className = "form-status";
    statusEl.textContent = "";

    submitBtn.disabled = true;
    submitBtn.textContent = "জমা হচ্ছে…";

    var record = {
      id: makeId(data.city),
      name: data.name,
      phone: data.phone,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      institution: data.institution,
      city: data.city,
      area: data.area,
      source: data.source,
      membership: data.membership,
      ambassador: data.ambassador,
      consent: true,
      submittedAt: new Date().toISOString()
    };

    function storeLocal() {
      var all = JSON.parse(localStorage.getItem("gco_registrations") || "[]");
      all.push(record);
      localStorage.setItem("gco_registrations", JSON.stringify(all));
    }

    var endpoint = (cfg.registrationEndpoint || "").trim();
    if (!endpoint) {
      storeLocal();
      showSuccess(record, true);
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      storeLocal();
      showSuccess(record, false);
    }).catch(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "আবার জমা দিন";
      statusEl.className = "form-status is-error";
      statusEl.textContent = "সংযোগে সমস্যা হয়েছে, আবেদন জমা হয়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন—নয়তো আমাদের ফেসবুক পেজে মেসেজ দিন।";
    });
  });

  // live-clear errors as the applicant fixes them
  form.addEventListener("input", function (e) {
    var wrap = e.target.closest(".field");
    if (wrap && wrap.classList.contains("has-error")) {
      wrap.classList.remove("has-error");
      e.target.setAttribute("aria-invalid", "false");
    }
  });
})();
