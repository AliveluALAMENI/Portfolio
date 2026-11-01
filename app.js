/**
 * KOMMANAPALLI ALIVELU MANGA TAYARU - PORTFOLIO INTERACTIVITY
 * Logic for:
 * 1. Background Particle & Grid Simulation
 * 2. GuardianFi Autonomous CFO Simulator
 * 3. Double-Entry Accounting Ledger Engine Demo
 * 4. Executive KPI Dashboard Switcher
 * 5. Live DCF & Sensitivity Valuation Sandbox
 * 6. Research Vault & Forensic Audit Filters
 * 7. Copy-to-Clipboard & Toast Notifications
 * 8. Resume Modal Viewer
 * 9. Interactive Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initGuardianFiSimulator();
  initLedgerEngine();
  initKpiDashboard();
  initDcfSandbox();
  initVaultFilter();
  initResumeModal();
  initClipboardActions();
  initContactForm();
  initMobileMenu();
});

/* ==========================================================================
   1. Particle Network Canvas (Financial Neural Nodes)
   ========================================================================== */
function initParticleBackground() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 25), 45);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.6 ? '#10b981' : Math.random() > 0.3 ? '#38bdf8' : '#f59e0b'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw and update particles
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. GuardianFi Autonomous CFO Simulator
   ========================================================================== */
function initGuardianFiSimulator() {
  const incomeSlider = document.getElementById('guardian-income');
  const debtSlider = document.getElementById('guardian-debt');
  const expensesSlider = document.getElementById('guardian-expenses');
  const savingsSlider = document.getElementById('guardian-savings');

  if (!incomeSlider || !debtSlider) return;

  function updateGuardianFi() {
    const income = parseFloat(incomeSlider.value);
    const debt = parseFloat(debtSlider.value);
    const expenses = parseFloat(expensesSlider.value);
    const savings = parseFloat(savingsSlider.value);

    // Update displayed values
    document.getElementById('val-income').textContent = `$${income.toLocaleString()}`;
    document.getElementById('val-debt').textContent = `$${debt.toLocaleString()}`;
    document.getElementById('val-expenses').textContent = `$${expenses.toLocaleString()}`;
    document.getElementById('val-savings').textContent = `$${savings.toLocaleString()}`;

    // Calculations
    const dti = ((debt / income) * 100).toFixed(1);
    const monthlyBurn = debt + expenses;
    const runwayMonths = monthlyBurn > 0 ? (savings / monthlyBurn).toFixed(1) : 0;
    
    // Algorithmic Guardrail: Safe Max Borrowing capacity
    const maxSafeDebtAllowed = income * 0.36; // 36% rule of thumb
    const borrowingHeadroom = Math.max(0, maxSafeDebtAllowed - debt);

    // Update DTI Display
    const dtiElem = document.getElementById('guardian-dti-val');
    const dtiStatusElem = document.getElementById('guardian-dti-status');
    if (dtiElem) dtiElem.textContent = `${dti}%`;

    if (dti < 36) {
      dtiStatusElem.className = 'sim-metric-status status-safe';
      dtiStatusElem.innerHTML = '● Optimal Runway (Safe)';
    } else if (dti <= 43) {
      dtiStatusElem.className = 'sim-metric-status status-warning';
      dtiStatusElem.innerHTML = '▲ Moderate Guardrail Warning';
    } else {
      dtiStatusElem.className = 'sim-metric-status status-alert';
      dtiStatusElem.innerHTML = '■ High Risk Threshold Exceeded';
    }

    // Update Runway
    const runwayElem = document.getElementById('guardian-runway-val');
    if (runwayElem) runwayElem.textContent = `${runwayMonths} Mo`;

    // Update Guardrail Headroom
    const headroomElem = document.getElementById('guardian-guardrail-val');
    if (headroomElem) headroomElem.textContent = `$${Math.round(borrowingHeadroom).toLocaleString()}/mo`;

    // Recommended Allocation
    const allocElem = document.getElementById('guardian-alloc-val');
    if (allocElem) {
      if (runwayMonths < 6) {
        allocElem.textContent = '60% Liquid / 40% Def';
      } else if (dti > 40) {
        allocElem.textContent = '70% Debt Reduc / 30% Fixed';
      } else {
        allocElem.textContent = '55% Equity / 35% FI / 10% Gold';
      }
    }
  }

  [incomeSlider, debtSlider, expensesSlider, savingsSlider].forEach(slider => {
    slider.addEventListener('input', updateGuardianFi);
  });

  updateGuardianFi();
}

/* ==========================================================================
   3. Automated Double-Entry Ledger & Accounting Engine Demo
   ========================================================================== */
function initLedgerEngine() {
  const feedBtn = document.getElementById('btn-simulate-feed');
  const ledgerTableBody = document.getElementById('ledger-tbody');
  const ledgerBalanceEl = document.getElementById('ledger-balance');

  if (!feedBtn || !ledgerTableBody) return;

  const mockFeeds = [
    { desc: 'Govt Tender Milestone Receipt', debit: 45000, credit: 0, account: 'Bank / Rev' },
    { desc: 'Oracle DB Cloud Infrastructure', debit: 0, credit: 3200, account: 'Tech OPEX' },
    { desc: 'State Advisory Fee Settlement', debit: 28500, credit: 0, account: 'AR Clear' },
    { desc: 'Forensic Audit Advisory Retainer', debit: 18000, credit: 0, account: 'Bank / Adv' },
    { desc: 'Automated Tax Withholding (TDS)', debit: 0, credit: 2400, account: 'Statutory' },
    { desc: 'Equity Research Subscription', debit: 12500, credit: 0, account: 'Subscr Rev' }
  ];

  let currentBalance = 1245000;
  let feedIndex = 0;

  feedBtn.addEventListener('click', () => {
    const item = mockFeeds[feedIndex % mockFeeds.length];
    feedIndex++;

    const row = document.createElement('tr');
    const netChange = item.debit - item.credit;
    currentBalance += netChange;

    const today = new Date();
    const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;
    const txId = `TXN-80${Math.floor(Math.random() * 900) + 100}`;

    row.innerHTML = `
      <td>${dateStr}</td>
      <td style="color: var(--text-muted);">${txId}</td>
      <td style="font-weight: 600; color: var(--text-primary);">${item.desc}</td>
      <td class="${item.debit > 0 ? 'ledger-credit' : ''}">${item.debit > 0 ? '+$' + item.debit.toLocaleString() : '-'}</td>
      <td class="${item.credit > 0 ? 'ledger-debit' : ''}">${item.credit > 0 ? '-$' + item.credit.toLocaleString() : '-'}</td>
      <td style="font-weight: 700;">$${currentBalance.toLocaleString()}</td>
    `;

    // Highlight row entry
    row.style.background = 'rgba(16, 185, 129, 0.15)';
    ledgerTableBody.prepend(row);

    setTimeout(() => {
      row.style.background = 'transparent';
      row.style.transition = 'background 0.8s ease';
    }, 400);

    // Limit to 5 visible rows
    if (ledgerTableBody.children.length > 5) {
      ledgerTableBody.removeChild(ledgerTableBody.lastChild);
    }

    if (ledgerBalanceEl) {
      ledgerBalanceEl.textContent = `$${currentBalance.toLocaleString()}`;
    }

    showToast(`Bank feed synced: ${item.desc}`);
  });
}

/* ==========================================================================
   4. Executive KPI Dashboard Switcher
   ========================================================================== */
function initKpiDashboard() {
  const tabs = document.querySelectorAll('.kpi-tab-btn');
  const titleEl = document.getElementById('kpi-active-title');
  const stat1Title = document.getElementById('kpi-stat1-title');
  const stat1Val = document.getElementById('kpi-stat1-val');
  const stat2Title = document.getElementById('kpi-stat2-title');
  const stat2Val = document.getElementById('kpi-stat2-val');
  const stat3Title = document.getElementById('kpi-stat3-title');
  const stat3Val = document.getElementById('kpi-stat3-val');
  const barContainer = document.getElementById('kpi-chart-bars');

  if (!tabs.length || !titleEl) return;

  const dataSets = {
    margins: {
      title: 'Sales Margin & EBITDA Expansion Analysis',
      stat1: { title: 'Gross Profit Margin', val: '42.8%' },
      stat2: { title: 'EBITDA Margin', val: '28.4%' },
      stat3: { title: 'Net Margin Delta', val: '+4.2%' },
      bars: [
        { label: 'Q1', pct: 65, val: '38.2%' },
        { label: 'Q2', pct: 72, val: '40.1%' },
        { label: 'Q3', pct: 81, val: '41.9%' },
        { label: 'Q4', pct: 90, val: '42.8%' }
      ]
    },
    working_capital: {
      title: 'Working Capital Cycles & Cash Conversion',
      stat1: { title: 'DSO (Days Sales Out)', val: '41 Days' },
      stat2: { title: 'DIO (Inventory Days)', val: '32 Days' },
      stat3: { title: 'Cash Conv. Cycle', val: '24 Days' },
      bars: [
        { label: 'DSO', pct: 55, val: '41d' },
        { label: 'DIO', pct: 45, val: '32d' },
        { label: 'DPO', pct: 70, val: '49d' },
        { label: 'CCC', pct: 35, val: '24d' }
      ]
    },
    geographic: {
      title: 'Geographic Revenue Mix & Multi-Currency',
      stat1: { title: 'APAC Region', val: '54.2%' },
      stat2: { title: 'EMEA Enterprise', val: '28.6%' },
      stat3: { title: 'Americas Inbound', val: '17.2%' },
      bars: [
        { label: 'APAC', pct: 88, val: '54%' },
        { label: 'EMEA', pct: 60, val: '29%' },
        { label: 'AMER', pct: 42, val: '17%' },
        { label: 'GLOBAL', pct: 100, val: '100%' }
      ]
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const view = tab.getAttribute('data-view');
      const data = dataSets[view];
      if (!data) return;

      titleEl.textContent = data.title;
      stat1Title.textContent = data.stat1.title;
      stat1Val.textContent = data.stat1.val;
      stat2Title.textContent = data.stat2.title;
      stat2Val.textContent = data.stat2.val;
      stat3Title.textContent = data.stat3.title;
      stat3Val.textContent = data.stat3.val;

      // Render Bar Chart
      if (barContainer) {
        barContainer.innerHTML = '';
        data.bars.forEach(b => {
          const col = document.createElement('div');
          col.style.display = 'flex';
          col.style.flexDirection = 'column';
          col.style.alignItems = 'center';
          col.style.gap = '0.3rem';
          col.style.flex = '1';

          col.innerHTML = `
            <div style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--emerald-400);">${b.val}</div>
            <div style="width: 100%; height: 80px; background: rgba(255,255,255,0.04); border-radius: 4px; display: flex; align-items: flex-end; overflow: hidden; padding: 2px;">
              <div style="width: 100%; height: ${b.pct}%; background: linear-gradient(180deg, var(--emerald-400), #059669); border-radius: 3px; transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);"></div>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-mono);">${b.label}</div>
          `;
          barContainer.appendChild(col);
        });
      }
    });
  });

  // Trigger default
  const defaultTab = document.querySelector('.kpi-tab-btn.active');
  if (defaultTab) defaultTab.click();
}

/* ==========================================================================
   5. Live DCF & Sensitivity Valuation Sandbox
   ========================================================================== */
function initDcfSandbox() {
  const fcfInput = document.getElementById('dcf-fcf');
  const growthInput = document.getElementById('dcf-growth');
  const waccInput = document.getElementById('dcf-wacc');
  const terminalInput = document.getElementById('dcf-terminal');

  if (!fcfInput || !growthInput) return;

  function calculateDCF() {
    const fcf = parseFloat(fcfInput.value) || 100;
    const g = (parseFloat(growthInput.value) || 12) / 100;
    const wacc = (parseFloat(waccInput.value) || 10) / 100;
    const tg = (parseFloat(terminalInput.value) || 3) / 100;

    // Display values
    document.getElementById('dcf-val-fcf').textContent = `₹${fcf} Cr`;
    document.getElementById('dcf-val-growth').textContent = `${(g * 100).toFixed(1)}%`;
    document.getElementById('dcf-val-wacc').textContent = `${(wacc * 100).toFixed(1)}%`;
    document.getElementById('dcf-val-terminal').textContent = `${(tg * 100).toFixed(1)}%`;

    // 5-Year Projections & Discounting
    let pvSum = 0;
    let projectedFcf = fcf;

    for (let t = 1; t <= 5; t++) {
      projectedFcf = projectedFcf * (1 + g);
      const discountFactor = Math.pow(1 + wacc, t);
      const pv = projectedFcf / discountFactor;
      pvSum += pv;
    }

    // Terminal Value calculation (Gordon Growth Model)
    // TV = (FCF5 * (1 + tg)) / (wacc - tg)
    let terminalValue = 0;
    let pvTerminalValue = 0;
    if (wacc > tg) {
      terminalValue = (projectedFcf * (1 + tg)) / (wacc - tg);
      pvTerminalValue = terminalValue / Math.pow(1 + wacc, 5);
    }

    const enterpriseValue = pvSum + pvTerminalValue;

    // Update Outputs
    const evElem = document.getElementById('dcf-ev-result');
    const pv5YrElem = document.getElementById('dcf-pv5yr-result');
    const tvElem = document.getElementById('dcf-tv-result');
    const pvTvElem = document.getElementById('dcf-pvtv-result');

    if (evElem) evElem.textContent = `₹${Math.round(enterpriseValue).toLocaleString()} Cr`;
    if (pv5YrElem) pv5YrElem.textContent = `₹${Math.round(pvSum).toLocaleString()} Cr`;
    if (tvElem) tvElem.textContent = `₹${Math.round(terminalValue).toLocaleString()} Cr`;
    if (pvTvElem) pvTvElem.textContent = `₹${Math.round(pvTerminalValue).toLocaleString()} Cr`;
  }

  [fcfInput, growthInput, waccInput, terminalInput].forEach(inp => {
    inp.addEventListener('input', calculateDCF);
  });

  calculateDCF();
}

/* ==========================================================================
   6. Research Vault & Forensic Audit Filters
   ========================================================================== */
function initVaultFilter() {
  const tabs = document.querySelectorAll('.vault-tab-btn');
  const auditView = document.getElementById('vault-audits-view');
  const reportsView = document.getElementById('vault-reports-view');

  if (!tabs.length || !auditView || !reportsView) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-vault');
      if (target === 'audits') {
        auditView.style.display = 'grid';
        reportsView.style.display = 'none';
      } else {
        auditView.style.display = 'none';
        reportsView.style.display = 'grid';
      }
    });
  });
}

/* ==========================================================================
   7. Copy-to-Clipboard & Toast Notifications
   ========================================================================== */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Selected: ${textToCopy}`);
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="color: var(--emerald-400); font-weight: 700;">✓</span>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   8. Resume Modal Viewer
   ========================================================================== */
function initResumeModal() {
  const openButtons = document.querySelectorAll('.btn-open-resume');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

/* ==========================================================================
   9. Interactive Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    if (!name || !email || !message) {
      showToast('Please fill in required fields.');
      return;
    }

    // Direct mailto trigger as fallback
    const mailtoUrl = `mailto:kommanapalliali@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio: ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
    window.location.href = mailtoUrl;

    showToast('Inquiry drafted! Launching your mail client...');
    form.reset();
  });
}

/* ==========================================================================
   10. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('navbar-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = navMenu.style.display === 'flex';
    navMenu.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = 'rgba(11, 17, 32, 0.98)';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid var(--border-subtle)';
    }
  });
}
