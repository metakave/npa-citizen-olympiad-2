/* Practice quiz — 12 questions across the five syllabus modules.
   Immediate feedback mode: answer, see the explanation, then move on. */
(function () {
  "use strict";

  var root = document.getElementById("quiz-app");
  if (!root) return;

  var MODULES = {
    1: "সংবিধান ও গণতন্ত্র",
    2: "সাম্য ও বহুত্ব",
    3: "পরিবেশ ও জলবায়ু",
    4: "অর্থনীতি ও জবাবদিহি",
    5: "ডিজিটাল নাগরিকত্ব"
  };

  var QS = [
    {
      m: 1,
      q: "বাংলাদেশের সংবিধানের কোন অনুচ্ছেদে ঘোষণা করা হয়েছে— “প্রজাতন্ত্রের সকল ক্ষমতার মালিক জনগণ”?",
      o: ["৭ নম্বর অনুচ্ছেদ", "১১ নম্বর অনুচ্ছেদ", "২৬ নম্বর অনুচ্ছেদ", "৩১ নম্বর অনুচ্ছেদ"],
      a: 0,
      why: "সংবিধানের ৭ম অনুচ্ছেদে বলা হয়েছে, প্রজাতন্ত্রের সকল ক্ষমতার মালিক জনগণ এবং সেই ক্ষমতা সংবিধানের অধীনেই প্রয়োগ হবে। এই অনুচ্ছেদকেই সংবিধান সংস্কার আলোচনার ভিত্তি ধরা হয়।"
    },
    {
      m: 1,
      q: "সংবিধানের তৃতীয় ভাগে কী বর্ণিত হয়েছে?",
      o: ["রাষ্ট্র পরিচালনার মূলনীতি", "মৌলিক অধিকার", "নির্বাহী বিভাগের গঠন", "স্থানীয় সরকারের ক্ষমতা"],
      a: 1,
      why: "দ্বিতীয় ভাগে রাষ্ট্র পরিচালনার মূলনীতি, তৃতীয় ভাগে (২৬–৪৭ অনুচ্ছেদ) মৌলিক অধিকার এবং চতুর্থ ভাগে নির্বাহী বিভাগের বিধান রয়েছে।"
    },
    {
      m: 1,
      q: "সংবিধান অনুযায়ী জাতীয় সংসদে মোট আসন কত?",
      o: ["৩০০", "৩২৫", "৩৫০", "৪০০"],
      a: 2,
      why: "৩০০টি সাধারণ আসন এবং নারীদের জন্য ৫০টি সংরক্ষিত আসন— মোট ৩৫০। সংরক্ষিত আসনের মেয়াদ সংশ্লিষ্ট সংসদের সঙ্গে সমাপ্ত হয়।"
    },
    {
      m: 2,
      q: "ধর্মীয় স্বাধীনতা সংবিধানের কোন অনুচ্ছেদে সুরক্ষিত?",
      o: ["৩৯ নম্বর অনুচ্ছেদ", "৪০ নম্বর অনুচ্ছেদ", "৪১ নম্বর অনুচ্ছেদ", "৪২ নম্বর অনুচ্ছেদ"],
      a: 2,
      why: "৪১ অনুচ্ছেদে ধর্মীয় স্বাধীনতা সুরক্ষিত। ৩৯-এ মতপ্রকাশের স্বাধীনতা, ৪০-এ পেশা-অবস্থান ও ৪২-এ সম্পত্তির অধিকার রয়েছে।"
    },
    {
      m: 1,
      q: "বাংলাদেশে ভোটার হিসেবে নিবন্ধনের ন্যূনতম বয়স কত?",
      o: ["১৬ বছর", "১৮ বছর", "২১ বছর", "২৫ বছর"],
      a: 1,
      why: "সংবিধানের ১২২ অনুচ্ছেদ অনুযায়ী ১৮ বছর পূর্ণ হলে ভোটার তালিকায় নাম অন্তর্ভুক্ত হয়। ভোটাধিকার প্রাপ্তির বয়সও ১৮।"
    },
    {
      m: 1,
      q: "স্থানীয় সরকার প্রতিষ্ঠানের নির্বাচিত প্রতিনিধিদের মেয়াদ সাধারণত কত বছর?",
      o: ["৩ বছর", "৪ বছর", "৫ বছর", "৬ বছর"],
      a: 2,
      why: "ইউনিয়ন পরিষদ, পৌরসভা, উপজেলা পরিষদ ও সিটি কর্পোরেশন— সব নির্বাচিত স্থানীয় পরিষদের মেয়াদ পাঁচ বছর। এই সময়সীমা স্থানীয় জবাবদিহির মূল ভিত্তি।"
    },
    {
      m: 3,
      q: "প্রাকৃতিক মৎস্য প্রজননক্ষেত্র হিসেবে পরিচিত হালদা নদী কোন জেলায়?",
      o: ["ঢাকা", "চট্টগ্রাম", "খুলনা", "বরিশাল"],
      a: 1,
      why: "হালদা চট্টগ্রাম জেলার নদী, যেখানে দেশীয় কার্প জাতীয় মাছ ডিম পাড়ে। নদীটির দূষণ ও খনন নিয়ে স্থানীয় নাগরিক আন্দোলন দীর্ঘদিনের।"
    },
    {
      m: 3,
      q: "বাংলাদেশের মূল পরিবেশ আইন কোনটি?",
      o: ["পরিবেশ সংরক্ষণ আইন, ১৯৯৫", "পরিবেশ সংরক্ষণ আইন, ১৯৮৫", "পরিবেশ ও বন আইন, ১৯৭২", "পরিবেশ সুরক্ষা আইন, ২০০৫"],
      a: 0,
      why: "বাংলাদেশ পরিবেশ সংরক্ষণ আইন, ১৯৯৫ এবং এর অধীন প্রণীত বিধিমালা (১৯৯৭) পরিবেশ প্রভাব মূল্যায়ন, শিল্প-দূষণ ও বর্জ্য ব্যবস্থাপনার মূল কাঠামো।"
    },
    {
      m: 4,
      q: "তথ্য অধিকার আইন বাংলাদেশে কত সালে পাস হয়?",
      o: ["২০০৬", "২০০৯", "২০১২", "২০১৫"],
      a: 1,
      why: "তথ্য অধিকার আইন, ২০০৯ (২০০৯ সালের কার্যকর) নাগরিককে সরকারি প্রতিষ্ঠানের তথ্য চাওয়ার অধিকার দেয়। বাজেট, প্রকল্প ব্যয় ও সেবার হিসাব জানতে এটি প্রাথমিক হাতিয়ার।"
    },
    {
      m: 3,
      q: "ঢাকার বায়ুদূষণের প্রধান উৎসগুলো কোনটি?",
      o: ["শুধুমাত্র সমুদ্রের লবণকণা", "ইটভাটা, যানবাহন ও রাস্তার ধুলা", "কেবল বর্জ্য পোড়ানো", "শুধু কৃষিকাজে ব্যবহৃত কীটনাশক"],
      a: 1,
      why: "পরিবেশ অধিদপ্তর ও গবেষণায় ইটভাটা, পুরোনো যানবাহনের ধোঁয়া এবং নির্মাণ-রাস্তার ধুলাকে ঢাকার বায়ুদূষণের প্রধান উৎস হিসেবে চিহ্নিত করা হয়েছে—শিল্প ও বর্জ্য পোড়ানোও যুক্ত।"
    },
    {
      m: 5,
      q: "অনলাইনে একটি ভিডিও দেখে সন্দেহ হলো এটি ডিপফেক। প্রথমে কী করা উচিত?",
      o: ["দ্রুত শেয়ার করে অন্যদের মতামত নেওয়া", "মূল উৎস ও স্বতন্ত্র সূত্রে তথ্যটি যাচাই করা", "ভিডিওর রেজোলিউশন বেশি কি না দেখা", "মন্তব্যের সংখ্যা দেখে সিদ্ধান্ত নেওয়া"],
      a: 1,
      why: "ডিপফেক শনাক্তের সবচেয়ে নির্ভরযোগ্য প্রথম ধাপ হলো উৎস যাচাই: কে প্রথম প্রকাশ করেছে, অন্য স্বতন্ত্র সংবাদমাধ্যম বা প্রতিষ্ঠান একই তথ্য দিচ্ছে কি না। ভাইরাল হওয়া বা চেহারার মান যাচাইয়ের মানদণ্ড নয়।"
    },
    {
      m: 4,
      q: "বাংলাদেশের শ্রমশক্তির সবচেয়ে বড় অংশ কোন খাতে কাজ করে?",
      o: ["সরকারি চাকরি", "প্রাতিষ্ঠানিক শিল্প", "অনানুষ্ঠানিক খাত", "বহুজাতিক কোম্পানি"],
      a: 2,
      why: "শ্রমশক্তি জরিপ অনুযায়ী দেশের শ্রমিকদের সিংহভাগ (প্রায় ৮৫%) অনানুষ্ঠানিক খাতে— দিনমজুর, গৃহকর্মী, রিকশাচালক, ক্ষুদ্র ব্যবসা। তাই সামাজিক সুরক্ষা ও ন্যূনতম মজুরির প্রশ্ন এখানেই সবচেয়ে জরুরি।"
    }
  ];

  var intro = document.getElementById("quiz-intro");
  var play = document.getElementById("quiz-play");
  var result = document.getElementById("quiz-result");
  var counterEl = document.getElementById("quiz-counter");
  var timerEl = document.getElementById("quiz-timer");
  var barEl = document.getElementById("quiz-bar");
  var cardEl = document.getElementById("quiz-card");
  var TOTAL_SECONDS = 600;

  var st = { i: 0, answers: [], left: TOTAL_SECONDS, tick: null, done: false };

  function bn(n) { return window.toBn ? window.toBn(n) : String(n); }

  function mmss(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return bn(m < 10 ? "0" + m : m) + ":" + bn(s < 10 ? "0" + s : s);
  }

  function startTimer() {
    st.left = TOTAL_SECONDS;
    timerEl.textContent = mmss(st.left);
    st.tick = setInterval(function () {
      st.left -= 1;
      if (st.left <= 0) {
        st.left = 0;
        timerEl.textContent = mmss(0);
        finish();
        return;
      }
      timerEl.textContent = mmss(st.left);
      timerEl.classList.toggle("is-low", st.left <= 60);
    }, 1000);
  }

  function start() {
    if (st.tick) return;
    intro.hidden = true;
    play.hidden = false;
    result.hidden = true;
    render();
    startTimer();
  }

  function render() {
    var q = QS[st.i];
    counterEl.textContent = "প্রশ্ন " + bn(st.i + 1) + " / " + bn(QS.length);
    barEl.style.width = ((st.i) / QS.length * 100) + "%";
    var letters = ["ক", "খ", "গ", "ঘ"];
    var html = '<span class="quiz-meta">বিষয়: ' + MODULES[q.m] + "</span>" +
      '<p class="quiz-q">' + q.q + "</p>" +
      '<div class="quiz-options" role="group" aria-label="উত্তরের বিকল্প">';
    q.o.forEach(function (opt, idx) {
      html += '<button type="button" class="quiz-option" data-i="' + idx + '">' +
        '<span class="letter">' + letters[idx] + "</span><span>" + opt + "</span></button>";
    });
    html += "</div>" +
      '<div class="quiz-explain" id="explain" aria-live="polite"></div>' +
      '<div class="quiz-actions">' +
      '<button type="button" class="btn btn-primary" id="quiz-next" hidden>' +
      (st.i === QS.length - 1 ? "ফলাফল দেখুন" : "পরবর্তী প্রশ্ন") + " →</button>" +
      '<span class="form-note" style="align-self:center">সঠিক উত্তর দিলে ১ নম্বর। নেগেটিভ মার্কিং নেই।</span>' +
      "</div>";
    cardEl.innerHTML = html;

    cardEl.querySelectorAll(".quiz-option").forEach(function (btn) {
      btn.addEventListener("click", function () { choose(parseInt(btn.dataset.i, 10)); });
    });
    var nextBtn = document.getElementById("quiz-next");
    nextBtn.addEventListener("click", next);
    cardEl.querySelector(".quiz-option").focus({ preventScroll: true });
  }

  function choose(idx) {
    if (st.done) return;
    var q = QS[st.i];
    var buttons = cardEl.querySelectorAll(".quiz-option");
    var correct = idx === q.a;
    st.answers.push({ i: st.i, pick: idx, correct: correct });

    buttons.forEach(function (btn, bIdx) {
      btn.disabled = true;
      if (bIdx === q.a) btn.classList.add("is-correct");
      if (bIdx === idx && !correct) btn.classList.add("is-wrong");
    });

    var ex = document.getElementById("explain");
    ex.innerHTML = "<strong>" + (correct ? "সঠিক উত্তর।" : "সঠিক উত্তর: " + q.o[q.a] + "।") +
      "</strong> " + q.why;
    ex.classList.add("is-open");
    document.getElementById("quiz-next").hidden = false;
    document.getElementById("quiz-next").focus({ preventScroll: true });
  }

  function next() {
    st.i += 1;
    if (st.i >= QS.length) { finish(); return; }
    render();
  }

  function finish() {
    if (st.done) return;
    st.done = true;
    clearInterval(st.tick);
    st.tick = null;
    play.hidden = true;

    var score = st.answers.filter(function (a) { return a.correct; }).length;
    var pct = Math.round(score / QS.length * 100);
    var per = {};
    QS.forEach(function (q) { per[q.m] = per[q.m] || { c: 0, t: 0 }; per[q.m].t += 1; });
    st.answers.forEach(function (a) { if (a.correct) per[QS[a.i].m].c += 1; });

    var verdict = pct >= 80 ? "দুর্দান্ত প্রস্তুতি — তুমি ফাইনালের যোগ্য।" :
      pct >= 50 ? "ভালো ভিত্তি আছে; দুই-তিনটি বিষয় ঝালিয়ে নিলেই প্রতিযোগিতায় টিকবে।" :
      "শুরুটা এখান থেকেই — সিলেবাস পড়ে আবার চেষ্টা করো।";

    var rows = Object.keys(per).map(function (m) {
      return '<div class="result-row"><span>' + MODULES[m] + '</span><span>' + bn(per[m].c) + " / " + bn(per[m].t) + "</span></div>";
    }).join("");

    var review = st.answers.map(function (a) {
      var q = QS[a.i];
      return '<div class="result-row" style="align-items:flex-start"><span style="max-width:78%">' + q.q +
        "</span><span>" + (a.correct ? "✓" : "✗") + "</span></div>";
    }).join("");

    var shareText = "সুনাগরিক অলিম্পিয়াডের প্র্যাকটিস কুইজে আমি " + bn(QS.length) +
      "-এর মধ্যে " + bn(score) + " পেয়েছি। তুমি কত পাবে? " + location.href;

    result.innerHTML =
      '<div class="quiz-card">' +
      '<div class="score-ring" style="--pct:' + pct + '%"><div class="score-ring-inner">' +
      '<span style="font-family:var(--serif);font-weight:700;font-size:1.5rem;color:var(--teal-deep)">' + bn(pct) + "%</span></div></div>" +
      '<p class="muted" style="margin-bottom:2px">তোমার স্কোর</p>' +
      '<p class="score-big">' + bn(score) + " <span style='font-size:.42em;color:var(--muted)'>/ " + bn(QS.length) + "</span></p>" +
      '<p style="font-size:1.02rem;margin-top:10px">' + verdict + "</p>" +
      '<div class="quiz-actions" style="margin-top:22px">' +
      '<a class="btn btn-primary" href="register.html">অলিম্পিয়াডে নিবন্ধন করো →</a>' +
      '<button type="button" class="btn btn-ghost" id="quiz-again">আবার চেষ্টা করো</button>' +
      "</div>" +
      '<p class="form-note" style="margin-top:14px">' +
      '<a href="https://wa.me/?text=' + encodeURIComponent(shareText) + '" target="_blank" rel="noopener">WhatsApp-এ ফলাফল শেয়ার করো</a> · ' +
      'এই কুইজ প্র্যাকটিসের জন্য; মূল অনলাইন রাউন্ডে ৬০টি প্রশ্ন থাকবে।</p>' +
      '<h3 style="margin-top:30px;font-size:1rem">বিষয়ভিত্তিক ফলাফল</h3>' +
      '<div class="result-grid">' + rows + "</div>" +
      '<h3 style="margin-top:10px;font-size:1rem">উত্তরপত্র</h3>' +
      '<div style="margin-bottom:6px">' + review + "</div>" +
      "</div>";
    result.hidden = false;

    document.getElementById("quiz-again").addEventListener("click", function () {
      st = { i: 0, answers: [], left: TOTAL_SECONDS, tick: null, done: false };
      result.hidden = true;
      result.innerHTML = "";
      play.hidden = false;
      render();
      startTimer();
    });
    requestAnimationFrame(function () {
      setTimeout(function () {
        result.scrollIntoView({ behavior: "auto", block: "start" });
      }, 40);
    });
  }

  document.getElementById("quiz-start").addEventListener("click", start);
})();
