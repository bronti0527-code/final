// ===== ADMIN AUTH GUARD =====
(function() {
  const adminPages = ['admin-dashboard.html','admin-bookings.html','admin-users.html','admin-cars.html','admin-feedbacks.html'];
  const page = window.location.pathname.split('/').pop();
  if (adminPages.includes(page)) {
    if (!localStorage.getItem('carrental_admin')) {
      window.location.href = 'admin-login.html';
    }
  }
})();

// ===== ADMIN LOGOUT =====
function adminLogout() {
  localStorage.removeItem('carrental_admin');
  window.location.href = 'admin-login.html';
}

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById('adminSidebar').classList.toggle('collapsed');
}

// ===== HELPERS =====
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getUserName(userId, users) {
  if (!users || !userId) return 'Guest';
  const u = users.find(x => x.id === userId);
  return u ? u.name : 'Unknown User';
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  let toast = document.getElementById('adminToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'adminToast';
    toast.style.cssText = `position:fixed;bottom:28px;right:28px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-left:4px solid #2ec4b6;color:#fff;padding:14px 20px;border-radius:8px;font-size:0.88rem;font-family:'DM Sans',sans-serif;z-index:99999;transform:translateX(200%);transition:transform 0.35s ease;min-width:260px;box-shadow:0 8px 24px rgba(0,0,0,0.4);`;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.borderLeftColor = type === 'error' ? '#e63946' : '#2ec4b6';
  toast.style.transform = 'translateX(0)';
  setTimeout(() => toast.style.transform = 'translateX(200%)', 3000);
}

// ===== STATUS MODAL =====
let currentEditId = null;

function openStatusModal(id, currentStatus) {
  currentEditId = id;
  document.getElementById('modalBookingId').textContent = id;
  document.getElementById('newStatus').value = currentStatus;
  document.getElementById('statusModal').classList.remove('hidden');
}

function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
  currentEditId = null;
}

function saveStatus() {
  const newStatus = document.getElementById('newStatus').value;
  let bookings = JSON.parse(localStorage.getItem('carrental_bookings') || '[]');
  bookings = bookings.map(b => b.id === currentEditId ? { ...b, status: newStatus } : b);
  localStorage.setItem('carrental_bookings', JSON.stringify(bookings));
  closeModal();
  showToast(`Booking ${currentEditId} updated to "${capitalize(newStatus)}"`);
  setTimeout(() => window.location.reload(), 800);
}

function deleteBooking(id) {
  if (!confirm(`Delete booking ${id}? This cannot be undone.`)) return;
  let bookings = JSON.parse(localStorage.getItem('carrental_bookings') || '[]');
  bookings = bookings.filter(b => b.id !== id);
  localStorage.setItem('carrental_bookings', JSON.stringify(bookings));
  showToast('Booking deleted.');
  setTimeout(() => window.location.reload(), 800);
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});
