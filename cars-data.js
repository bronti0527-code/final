// ===== ALL CARS DATA =====
const allCars = [
  { id:1,  name:'Toyota Camry',      type:'Sedan',    fuel:'Petrol',   transmission:'Automatic', seats:5, price:2500,  color:'#e63946', icon:'fa-car' },
  { id:2,  name:'BMW 5 Series',      type:'Luxury',   fuel:'Hybrid',   transmission:'Automatic', seats:5, price:7500,  color:'#f4a261', icon:'fa-car-side' },
  { id:3,  name:'Mahindra XUV700',   type:'SUV',      fuel:'Diesel',   transmission:'Automatic', seats:7, price:4200,  color:'#457b9d', icon:'fa-truck' },
  { id:4,  name:'Honda City',        type:'Sedan',    fuel:'Petrol',   transmission:'Manual',    seats:5, price:1800,  color:'#2ec4b6', icon:'fa-car' },
  { id:5,  name:'Tata Nexon EV',     type:'SUV',      fuel:'Electric', transmission:'Automatic', seats:5, price:3200,  color:'#4caf50', icon:'fa-bolt' },
  { id:6,  name:'Mercedes C-Class',  type:'Luxury',   fuel:'Petrol',   transmission:'Automatic', seats:5, price:9000,  color:'#b8860b', icon:'fa-crown' },
  { id:7,  name:'Maruti Ertiga',     type:'Van',      fuel:'Petrol',   transmission:'Manual',    seats:7, price:2200,  color:'#9c27b0', icon:'fa-shuttle-van' },
  { id:8,  name:'Hyundai Creta',     type:'SUV',      fuel:'Diesel',   transmission:'Automatic', seats:5, price:3500,  color:'#ff5722', icon:'fa-truck' },
  { id:9,  name:'Kia Sonet',         type:'SUV',      fuel:'Petrol',   transmission:'Automatic', seats:5, price:2800,  color:'#3f51b5', icon:'fa-car-side' },
  { id:10, name:'Toyota Fortuner',   type:'SUV',      fuel:'Diesel',   transmission:'Automatic', seats:7, price:5500,  color:'#795548', icon:'fa-truck' },
  { id:11, name:'Maruti Swift',      type:'Hatchback',fuel:'Petrol',   transmission:'Manual',    seats:5, price:1200,  color:'#009688', icon:'fa-car-side' },
  { id:12, name:'Porsche 911',       type:'Sports',   fuel:'Petrol',   transmission:'Automatic', seats:2, price:18000, color:'#e63946', icon:'fa-tachometer-alt' },
  { id:13, name:'Tata Altroz',       type:'Hatchback',fuel:'Petrol',   transmission:'Manual',    seats:5, price:1400,  color:'#607d8b', icon:'fa-car-side' },
  { id:14, name:'Innova Crysta',     type:'Van',      fuel:'Diesel',   transmission:'Automatic', seats:7, price:3800,  color:'#8bc34a', icon:'fa-shuttle-van' },
  { id:15, name:'Audi A6',           type:'Luxury',   fuel:'Petrol',   transmission:'Automatic', seats:5, price:11000, color:'#9e9e9e', icon:'fa-car' },
  { id:16, name:'Hyundai i20',       type:'Hatchback',fuel:'Petrol',   transmission:'Manual',    seats:5, price:1100,  color:'#ff9800', icon:'fa-car-side' },
];

let filteredCars = [...allCars];

// ===== RENDER CARS =====
function renderCars(cars) {
  const grid = document.getElementById('carsGrid');
  const countEl = document.getElementById('resultCount');
  if (!grid) return;
  if (countEl) countEl.textContent = `Showing ${cars.length} of ${allCars.length} vehicles`;

  if (cars.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--gray)">
      <i class="fas fa-car" style="font-size:3rem;opacity:0.2;display:block;margin-bottom:16px"></i>
      <p>No vehicles match your filters. Try adjusting them.</p>
    </div>`;
    return;
  }

  grid.innerHTML = cars.map((car, i) => `
    <div class="car-card fade-up" style="animation-delay:${i*0.05}s">
      <div class="car-thumb" style="--car-color:${car.color}">
        <i class="fas ${car.icon}"></i>
        <div class="car-type-badge">${car.type}</div>
      </div>
      <div class="car-body">
        <h3>${car.name}</h3>
        <div class="car-meta">
          <span><i class="fas fa-users"></i> ${car.seats} seats</span>
          <span><i class="fas fa-cog"></i> ${car.transmission}</span>
          <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
        </div>
        <div class="car-foot">
          <div class="car-price">₹${car.price.toLocaleString()}<small>/day</small></div>
          <a href="book.html?id=${car.id}" class="btn-primary small">Book Now</a>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== GET CAR BY ID =====
function getCarById(id) {
  return allCars.find(c => c.id === parseInt(id));
}
