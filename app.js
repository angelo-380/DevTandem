/**
 * DevTándem - Prototipo MVP Interactivo
 * Ajustado según el informe final de investigación de mercado (Tecsup 2026)
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  updateCalculator(60);
});

// App State
let currentView = 'landing';
let currentRole = 'cliente';
let currentRegRole = 'cliente';
let currentRegStep = 1;
let qaCriterionCount = 3;
let qaIssued = false;
let fundsReleased = false;

// Selected executor level (Insight del Focus Group: Junior, Semi-Senior, Senior)
let currentExecutorLevel = 'junior';

/**
 * Switch top-level views (Landing, Registro, Cliente, Junior, Mentor, Escrow)
 */
function switchView(viewName) {
  const views = document.querySelectorAll('.page-view');
  views.forEach(v => {
    v.classList.add('hidden');
    v.classList.remove('block');
  });

  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('block');
    currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update desktop switcher buttons
  const buttons = document.querySelectorAll('.nav-menu-item');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = document.getElementById(`nav-btn-${viewName}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Update mobile buttons
  const mButtons = document.querySelectorAll('.mobile-nav-btn');
  mButtons.forEach(btn => btn.classList.remove('active'));
  const mActive = document.getElementById(`m-nav-${viewName}`);
  if (mActive) {
    mActive.classList.add('active');
  }

  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 40);
}

/**
 * Filter roles on the landing hero (Cliente Mype, Junior, Mentor)
 */
function setHeroRole(role) {
  currentRole = role;
  const container = document.getElementById('hero-role-content');
  const roleTag = document.getElementById('role-tag');
  
  const btnCliente = document.getElementById('hero-btn-cliente');
  const btnJunior = document.getElementById('hero-btn-junior');
  const btnMentor = document.getElementById('hero-btn-mentor');

  [btnCliente, btnJunior, btnMentor].forEach(b => {
    b.className = 'py-2 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition';
  });

  if (role === 'cliente') {
    btnCliente.className = 'py-2 px-3 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-sm border border-slate-200';
    roleTag.textContent = 'Mype / Startup';
    roleTag.className = 'text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200';

    container.innerHTML = `
      <div class="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 class="font-bold text-slate-900 text-sm">Para Dueños de Mypes</h4>
          <p class="text-xs text-slate-500">Perfil: Itziar (32 años, Arequipa) • Milagros Cruz (Psicóloga)</p>
        </div>
        <span class="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Sello Senior</span>
      </div>
      <p class="text-xs text-slate-600 leading-relaxed">
        “Obtén software a la medida sin pagar los S/ 8,000 de una agencia ni arriesgarte con freelancers sin supervisión. Tu dinero queda congelado en custodia hasta que el Tech Lead audita y sella la entrega.”
      </p>
      <div class="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
        <div class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> Auditoría preventiva de código</div>
        <div class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> Pago protegido en Escrow</div>
        <div class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> Soporte técnico incluido</div>
        <div class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> Contrato de alcance cerrado</div>
      </div>
    `;
  } else if (role === 'junior') {
    btnJunior.className = 'py-2 px-3 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-sm border border-slate-200';
    roleTag.textContent = 'Programador Junior';
    roleTag.className = 'text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200';

    container.innerHTML = `
      <div class="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 class="font-bold text-slate-900 text-sm">Para Desarrolladores Junior</h4>
          <p class="text-xs text-slate-500">Perfil: Gabriel Flores (Egresado) • Diego Huaca (Tecsup)</p>
        </div>
        <span class="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">S/ 20.00 / h</span>
      </div>
      <p class="text-xs text-slate-600 leading-relaxed">
        “Rompe la barrera de los 2 años de experiencia previa. Desarrolla proyectos reales para empresas con la orientación directa de un mentor senior, checklist transparente y pago asegurado.”
      </p>
      <div class="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
        <div class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> Gana S/ 20/h (supera S/ 12-15)</div>
        <div class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> Portafolio validado públicamente</div>
        <div class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> Checklist de QA visible</div>
        <div class="flex items-center gap-1.5"><span class="text-emerald-600 font-bold">✓</span> Retroalimentación formativa</div>
      </div>
    `;
  } else if (role === 'mentor') {
    btnMentor.className = 'py-2 px-3 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-sm border border-slate-200';
    roleTag.textContent = 'Mentor Senior (Tech Lead)';
    roleTag.className = 'text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200';

    container.innerHTML = `
      <div class="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 class="font-bold text-slate-900 text-sm">Para Tech Leads & Seniors</h4>
          <p class="text-xs text-slate-500">Perfil: Renato Usnayo (Docente Tecsup) • Richard Ricasca</p>
        </div>
        <span class="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">S/ 40.00 / h</span>
      </div>
      <p class="text-xs text-slate-600 leading-relaxed">
        “Monetiza tu experiencia técnica sin tener que programar proyectos completos desde cero. Dedica unas 5 horas semanales a revisar arquitectura, auditar código y guiar a jóvenes talentos.”
      </p>
      <div class="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
        <div class="flex items-center gap-1.5"><span class="text-blue-600 font-bold">✓</span> Dedicas solo el 20% del tiempo</div>
        <div class="flex items-center gap-1.5"><span class="text-blue-600 font-bold">✓</span> Pago protegido por horas auditadas</div>
        <div class="flex items-center gap-1.5"><span class="text-blue-600 font-bold">✓</span> Flujo asíncrono vía GitHub</div>
        <div class="flex items-center gap-1.5"><span class="text-blue-600 font-bold">✓</span> SLA de revisión ≤ 24 hrs</div>
      </div>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}

function testQuickPanel() {
  if (currentRole === 'cliente') {
    switchView('cliente');
  } else if (currentRole === 'junior') {
    switchView('junior');
  } else {
    switchView('mentor');
  }
}

/**
 * Registration: select role in step 1
 */
function selectRegRole(role) {
  currentRegRole = role;
  const cards = ['cliente', 'junior', 'mentor'];
  cards.forEach(k => {
    const el = document.getElementById(`reg-card-${k}`);
    if (el) {
      if (k === role) {
        el.className = 'cursor-pointer p-4 rounded-xl border-2 border-[#2E9E5B] bg-emerald-50/30 text-center transition';
      } else {
        el.className = 'cursor-pointer p-4 rounded-xl border border-slate-200 bg-white text-center hover:border-slate-300 transition';
      }
    }
  });
}

function nextRegStep(step) {
  currentRegStep = step;
  for (let s = 1; s <= 3; s++) {
    const el = document.getElementById(`reg-step-${s}`);
    if (el) el.classList.toggle('hidden', s !== step);
    
    const badge = document.getElementById(`step-indicator-${s}`);
    if (badge) {
      if (s < step) {
        badge.className = 'w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold';
        badge.textContent = '✓';
      } else if (s === step) {
        badge.className = 'w-6 h-6 rounded-full bg-[#12213D] text-white flex items-center justify-center text-xs font-bold';
        badge.textContent = s;
      } else {
        badge.className = 'w-6 h-6 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center text-xs font-semibold';
        badge.textContent = s;
      }
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

function finishRegistration() {
  showToast('¡Registro completado! Perfil verificado con éxito.', 'success');
  setTimeout(() => {
    if (currentRegRole === 'cliente') switchView('cliente');
    else if (currentRegRole === 'mentor') switchView('mentor');
    else switchView('junior');
  }, 600);
}

/**
 * Junior Panel: Submit fix
 */
function submitJuniorFix() {
  const btn = document.getElementById('junior-submit-btn');
  btn.innerHTML = `<span class="animate-spin mr-1">⟳</span> Enviando...`;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `✓ Hito enviado al Mentor`;
    btn.className = 'px-4 py-2 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold cursor-not-allowed';
    showToast('Hito 2 actualizado. Marcos Lara (Tech Lead) fue notificado para QA.', 'success');
  }, 800);
}

/**
 * Mentor Panel: update QA checklist & criteria
 */
function updateQaStatus() {
  const chk1 = document.getElementById('qa-chk-1').checked;
  const chk2 = document.getElementById('qa-chk-2').checked;
  const chk3 = document.getElementById('qa-chk-3').checked;
  const chk4 = document.getElementById('qa-chk-4').checked;

  const count = [chk1, chk2, chk3, chk4].filter(Boolean).length;
  qaCriterionCount = count;

  const text = document.getElementById('qa-progress-text');
  if (text) text.textContent = `${count} de 4 criterios cumplidos`;

  const sealBtn = document.getElementById('mentor-seal-btn');
  if (sealBtn) {
    if (count === 4) {
      sealBtn.classList.remove('opacity-50', 'pointer-events-none');
    } else {
      sealBtn.classList.add('opacity-50', 'pointer-events-none');
    }
  }
}

function requestCorrections() {
  const c = document.getElementById('mentor-comment').value;
  showToast(`Corrección solicitada al junior: "${c}"`, 'info');
}

function issueValidationSeal() {
  document.getElementById('qa-chk-4').checked = true;
  updateQaStatus();

  const sealBtn = document.getElementById('mentor-seal-btn');
  sealBtn.innerHTML = `✓ Sello Oficial Emitido`;
  sealBtn.className = 'flex-1 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 seal-pulse';

  qaIssued = true;
  showToast('¡SELLO EMITIDO! Código auditado sin fallas. Custodia lista para liberación.', 'success');

  const escrowSealTag = document.getElementById('escrow-seal-tag');
  if (escrowSealTag) {
    escrowSealTag.textContent = 'VALIDADO POR MENTOR';
    escrowSealTag.className = 'text-[10px] font-bold text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 rounded';
  }
}

/**
 * Escrow Panel: Confirm release
 */
function confirmFundsRelease() {
  const btn = document.getElementById('btn-release-funds');
  btn.innerHTML = `<span class="animate-spin mr-1">⟳</span> Procesando...`;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = `✓ Pago liberado con éxito`;
    btn.className = 'w-full py-3 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl cursor-default flex items-center justify-center gap-2';

    const card3 = document.getElementById('escrow-step-card-3');
    if (card3) card3.className = 'p-4 rounded-xl border border-emerald-400 bg-emerald-50/50 relative';

    const releaseTag = document.getElementById('escrow-release-tag');
    if (releaseTag) {
      releaseTag.textContent = 'PAGADO';
      releaseTag.className = 'text-[10px] font-bold text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 rounded';
    }

    fundsReleased = true;
    showToast('Fondos transferidos: Junior S/ 600.00 y Mentor S/ 240.00.', 'success');
  }, 1000);
}

/**
 * Dynamic Pricing Calculator with Executor Levels (Tabla 21, 23 y Aporte Focus Group)
 */
function updateCalculator(hours) {
  const h = parseInt(hours, 10);
  const badge = document.getElementById('calc-hours-badge');
  if (badge) badge.textContent = `${h} horas`;

  let rateJunior = 20;
  if (currentExecutorLevel === 'semisenior') rateJunior = 30;
  else if (currentExecutorLevel === 'senior') rateJunior = 45;

  const juniorTotal = h * rateJunior;
  const mentorHours = Math.round(h * 0.2);
  const mentorTotal = mentorHours * 40;
  const platformTotal = Math.round((juniorTotal + mentorTotal) * 0.136);
  const total = juniorTotal + mentorTotal + platformTotal;

  document.getElementById('calc-junior-hours').textContent = h;
  document.getElementById('calc-mentor-hours').textContent = mentorHours;
  document.getElementById('calc-junior-val').textContent = `S/ ${juniorTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
  document.getElementById('calc-mentor-val').textContent = `S/ ${mentorTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
  document.getElementById('calc-platform-val').textContent = `S/ ${platformTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
  document.getElementById('calc-total').textContent = `S/ ${total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
}

function setExecutorLevel(level) {
  currentExecutorLevel = level;
  ['junior', 'semisenior', 'senior'].forEach(lvl => {
    const btn = document.getElementById(`btn-exec-${lvl}`);
    if (btn) {
      if (lvl === level) {
        btn.className = 'py-1.5 px-3 rounded-lg text-xs font-bold bg-[#12213D] text-white shadow-sm';
      } else {
        btn.className = 'py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200';
      }
    }
  });

  const slider = document.getElementById('calc-hours-slider');
  if (slider) updateCalculator(slider.value);
}

/**
 * Project Publication Modal
 */
function openProjectModal() {
  const m = document.getElementById('modal-project');
  if (m) m.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeProjectModal() {
  const m = document.getElementById('modal-project');
  if (m) m.classList.add('hidden');
}

function updateModalPrice(val) {
  const display = document.getElementById('modal-price-display');
  const num = parseFloat(val);
  if (display) display.textContent = `S/ ${num.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
}

function openCustomCheckout(name, price) {
  openProjectModal();
  const input = document.getElementById('modal-prj-name');
  if (input) input.value = `Proyecto: ${name}`;
  const level = document.getElementById('modal-prj-level');
  if (level) level.value = String(price);
  updateModalPrice(price);
}

function handleProjectSubmit(e) {
  e.preventDefault();
  closeProjectModal();
  showToast('Esta es una demostración: no se envió ni guardó la cotización. Puedes explorar el panel de ejemplo.', 'info');
  setTimeout(() => {
    switchView('cliente');
  }, 700);
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const isSuccess = type === 'success';

  toast.className = `p-3.5 rounded-xl shadow-lg border text-xs font-medium max-w-sm flex items-start gap-2.5 pointer-events-auto transition-all transform duration-200 opacity-0 translate-y-2 bg-white ${
    isSuccess ? 'border-emerald-300 text-slate-800' : 'border-blue-300 text-slate-800'
  }`;

  toast.innerHTML = `
    <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
      isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
    }">${isSuccess ? '✓' : 'ℹ'}</span>
    <div class="flex-1 leading-snug">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}
