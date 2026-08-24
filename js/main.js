/**
 * 부천코엔이비인후과의원 어지럼증 클리닉 - Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect & Top button
  const header = document.querySelector('.header');
  const topBtn = document.getElementById('topBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
      if (topBtn) topBtn.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      if (topBtn) topBtn.classList.remove('visible');
    }
  });

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
    });

    // Close mobile drawer when clicking links
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. Interactive Self-Diagnosis Checklist
  const checkItems = document.querySelectorAll('.check-item');
  const resultCountBadge = document.getElementById('resultCount');
  const resultStatus = document.getElementById('resultStatus');
  const resultAdvice = document.getElementById('resultAdvice');

  const adviceMap = {
    none: {
      status: "자가진단 항목을 선택해보세요",
      advice: "평소 경험하셨던 어지럼증 및 동반 증상을 체크하시면 현재 상태에 적합한 전문의 권고사항을 안내해 드립니다."
    },
    low: {
      status: "초기 전정기관 이상 또는 일시적 피로 가능성",
      advice: "어지럼 증상이 간헐적이더라도 1주일 이상 지속되거나 특정 머리 위치에서 반복된다면 조기 이비인후과 진찰을 권장합니다."
    },
    mid: {
      status: "이석증 또는 전정신경염 의심 단계 (정밀검사 권장)",
      advice: "머리를 움직일 때 순간적인 핑 도는 증상이나 균형 감각 저하가 발생하고 있습니다. 비디오안진검사(VOG)를 통한 신속한 원인 파악 및 이석정복술/맞춤 치료가 필요합니다."
    },
    high: {
      status: "복합 전정질환 또는 메니에르병 고위험 단계 (신속 진료 요망)",
      advice: "반복되는 회전성 어지럼과 함께 이명, 난청, 귀 먹먹함(이충만감)이 동반되는 심각한 신호일 수 있습니다. 청력 손실을 방지하고 만성화를 막기 위해 즉시 정밀 이비인후과 진료를 권장합니다."
    }
  };

  function updateChecklistResult() {
    const checkedCount = document.querySelectorAll('.check-item.active').length;
    if (resultCountBadge) {
      resultCountBadge.textContent = checkedCount;
    }

    if (checkedCount === 0) {
      resultStatus.textContent = adviceMap.none.status;
      resultAdvice.textContent = adviceMap.none.advice;
      resultStatus.style.color = 'var(--primary-900)';
    } else if (checkedCount <= 2) {
      resultStatus.textContent = adviceMap.low.status;
      resultAdvice.textContent = adviceMap.low.advice;
      resultStatus.style.color = '#0284c7';
    } else if (checkedCount <= 4) {
      resultStatus.textContent = adviceMap.mid.status;
      resultAdvice.textContent = adviceMap.mid.advice;
      resultStatus.style.color = '#d97706';
    } else {
      resultStatus.textContent = adviceMap.high.status;
      resultAdvice.textContent = adviceMap.high.advice;
      resultStatus.style.color = '#dc2626';
    }
  }

  checkItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      updateChecklistResult();
    });
  });

  // 4. Disease Details Modal
  const diseaseData = {
    bppv: {
      title: "이석증 (양성돌발성체위현훈, BPPV)",
      badge: "가장 흔한 어지럼증 원인",
      content: `
        <h4>1. 질환 정의 및 발생 원인</h4>
        <p>귓속 내이(속귀)의 전정기관에 정상적으로 위치해야 할 미세한 칼슘 탄산염 덩어리(이석, Otolith)가 노화, 외상, 피로, 스트레스, 골밀도 저하 등으로 인해 떨어져 나와 회전 감각을 담당하는 '세반고리관' 안으로 흘러 들어가 신경을 자극하면서 발생하는 질환입니다.</p>
        
        <h4>2. 대표적인 특징 및 증상</h4>
        <p>• <strong>특정 자세 변화 시 유발</strong>: 아침에 일어날 때, 고개를 돌릴 때, 눕거나 돌아누울 때 천장이 빙글빙글 도는 극심한 회전성 어지럼</p>
        <p>• <strong>짧은 지속 시간</strong>: 머리를 가만히 두면 대개 수초~1분 이내에 서서히 잦아듦</p>
        <p>• <strong>동반 증상</strong>: 심한 구역감(메스꺼움), 구토, 식은땀 등 자율신경계 반응 (단, 이명이나 청력 저하는 동반되지 않음)</p>

        <h4>3. 부천코엔이비인후과의원의 정밀 진단 및 치료법</h4>
        <p>• <strong>디지털 비디오 안진검사(VOG)</strong>: 어지럼 유발 안진(눈동자 떨림) 방향과 각도를 면밀히 분석하여 3개의 반고리관 중 어느 반고리관에 이석이 위치하는지(후반고리관/수평반고리관/상반고리관) 정확하게 진단합니다.</p>
        <p>• <strong>이석정복술(체위교정치료)</strong>: 에플리(Epley), 바비큐(Barbecue) 등의 정밀 수기 요법을 통해 이석을 원래 위치로 안전하게 되돌려놓으며, 1~2회의 치료만으로도 90% 이상 드라마틱한 호전을 기대할 수 있습니다.</p>
      `
    },
    vestibular: {
      title: "전정신경염 (Vestibular Neuritis)",
      badge: "극심한 급성 회전성 어지럼",
      content: `
        <h4>1. 질환 정의 및 발생 원인</h4>
        <p>귀 안쪽 평형 감각 정보를 뇌로 전달하는 신경인 '전정신경'에 바이러스 감염(감기나 호흡기 질환 후 호발)이나 혈액순환 장애 등으로 인해 급성 염증이 발생하여 한쪽 전정기관의 기능이 급격히 저하되는 질환입니다.</p>
        
        <h4>2. 대표적인 특징 및 증상</h4>
        <p>• <strong>수일간 지속되는 강한 어지럼</strong>: 자세와 상관없이 가만히 있어도 며칠 동안 주변 세상이 심하게 돕니다.</p>
        <p>• <strong>보행 장애 및 쏠림 현상</strong>: 똑바로 걷지 못하고 병변이 발생한 쪽으로 몸이 심하게 기웁니다.</p>
        <p>• <strong>심한 구토</strong>: 초기 2~3일간은 앉거나 일어서기 힘들 정도로 어지러움과 구토가 동반됩니다. (청력 저하는 거의 없음)</p>

        <h4>3. 부천코엔이비인후과의원의 정밀 진단 및 치료법</h4>
        <p>• <strong>급성기 진정 치료</strong>: 발병 초기 극심한 어지럼증과 오심을 완화하기 위해 전정억제제와 항염증제(스테로이드)를 적절히 처방하여 신경 손상을 최소화합니다.</p>
        <p>• <strong>단계별 맞춤 전정재활치료</strong>: 급성기(2~3일)가 지나면 뇌의 보상 기전(Vestibular Compensation)을 촉진하는 단계별 전정재활운동을 통해 잔여 어지럼증을 빠르고 안전하게 회복시킵니다.</p>
      `
    },
    meniere: {
      title: "메니에르병 (Meniere's Disease)",
      badge: "청력저하·이명 동반 복합 질환",
      content: `
        <h4>1. 질환 정의 및 발생 원인</h4>
        <p>속귀(내이)의 달팽이관과 전정기관 속을 순환하는 '내림프액'의 생성이 과다해지거나 흡수에 장애가 생겨 압력이 비정상적으로 높아지는 '내림프 수종'에 의해 발생합니다. 유전적 요인, 자가면역, 과로, 스트레스, 염분 과다 섭취 등이 주된 유발 인자입니다.</p>
        
        <h4>2. 4대 핵심 증상 (반드시 감별 필요)</h4>
        <p>• <strong>반복적인 회전성 어지럼 발작</strong>: 20분~수 시간 동안 심한 어지럼증이 지속됨</p>
        <p>• <strong>변동성 난청</strong>: 특히 저음역대 청력이 떨어졌다가 회복되기를 반복함</p>
        <p>• <strong>이명(귀울림)</strong>: '웅-' 또는 '삐-' 하는 소리가 어지럼 발작 전후로 심해짐</p>
        <p>• <strong>이충만감(귀 먹먹함)</strong>: 귀에 물이 찬 듯 꽉 막힌 느낌이 듦</p>

        <h4>3. 부천코엔이비인후과의원의 정밀 진단 및 치료법</h4>
        <p>• <strong>방음부스 정밀 순음청력검사 & GSI 39 Auto Tymp 이관기능검사</strong>: 저음역대 감각신경성 난청 여부와 이관 압력 상태를 정밀 추적합니다.</p>
        <p>• <strong>장기적 관리 & 약물 치료</strong>: 이뇨제, 혈관확장제, 전정안정제를 통한 내림프압 강하 및 저염식 식이요법, 스트레스 조절 생활 가이드를 1:1로 지도합니다.</p>
      `
    }
  };

  const diseaseModal = document.getElementById('diseaseModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseFooter = document.getElementById('modalCloseFooter');

  function openDiseaseModal(key) {
    const data = diseaseData[key];
    if (!data || !diseaseModal) return;

    modalTitle.innerHTML = `${data.title} <span class="section-badge" style="font-size:0.75rem; margin-left:8px; vertical-align:middle;">${data.badge}</span>`;
    modalBody.innerHTML = data.content;
    diseaseModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDiseaseModal() {
    if (diseaseModal) {
      diseaseModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('[data-disease]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const diseaseKey = btn.getAttribute('data-disease');
      openDiseaseModal(diseaseKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDiseaseModal);
  if (modalCloseFooter) modalCloseFooter.addEventListener('click', closeDiseaseModal);
  if (diseaseModal) {
    diseaseModal.addEventListener('click', (e) => {
      if (e.target === diseaseModal) closeDiseaseModal();
    });
  }

  // 5. Scroll Trigger Animations (IntersectionObserver)
  const fadeElems = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    fadeElems.forEach(el => observer.observe(el));
  } else {
    fadeElems.forEach(el => el.classList.add('in-view'));
  }
});
