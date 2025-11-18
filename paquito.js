const prices = {
    'VIP': 50.00,
    'Butacas': 30.00,
    'General': 15.00
};

let sales = [];
let statistics = {
    VIP: { tickets: 0, total: 0 },
    Butacas: { tickets: 0, total: 0 },
    General: { tickets: 0, total: 0 }
};

function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (section === 'ventas') {
        document.getElementById('ventas-section').classList.add('active');
        document.querySelectorAll('.nav-btn')[0].classList.add('active');
    } else if (section === 'estadisticas') {
        document.getElementById('estadisticas-section').classList.add('active');
        document.querySelectorAll('.nav-btn')[1].classList.add('active');
        updateStatistics();
    }
}

function showAlert(message, type) {
    const alertDiv = document.getElementById('alertMessage');
    alertDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;

    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 3000);
}

document.getElementById('ticketForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const quantity = parseInt(document.getElementById('quantity').value);
    const category = document.getElementById('category').value;

    if (!category) {
        showAlert('Por favor seleccione una categoría', 'error');
        return;
    }

    if (quantity < 1) {
        showAlert('La cantidad debe ser mayor a 0', 'error');
        return;
    }

    const unitPrice = prices[category];
    const total = quantity * unitPrice;

    const sale = {
        id: sales.length + 1,
        category: category,
        quantity: quantity,
        unitPrice: unitPrice,
        total: total
    };

    sales.push(sale);
    statistics[category].tickets += quantity;
    statistics[category].total += total;

    updateTable();
    showAlert(`Exito en la venta: ${quantity} boleto(s) ${category} por $${total.toFixed(2)}`, 'success');
    clearForm();
});

function clearForm() {
    document.getElementById('ticketForm').reset();
}

function updateTable() {
    const tbody = document.getElementById('salesTableBody');

    if (sales.length === 0) {
        tbody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center; color: #999;">
                            No hay ventas registradas aún
                        </td>
                    </tr>
                `;
        return;
    }

    tbody.innerHTML = '';
    sales.forEach(sale => {
        const row = tbody.insertRow();
        row.innerHTML = `
                    <td>${sale.id}</td>
                    <td>${sale.category}</td>
                    <td>${sale.quantity}</td>
                    <td>$${sale.unitPrice.toFixed(2)}</td>
                    <td>$${sale.total.toFixed(2)}</td>
                `;
    });
}

function updateStatistics() {
    document.getElementById('vipTickets').textContent = statistics.VIP.tickets;
    document.getElementById('vipTotal').textContent = `$${statistics.VIP.total.toFixed(2)}`;

    document.getElementById('butacasTickets').textContent = statistics.Butacas.tickets;
    document.getElementById('butacasTotal').textContent = `$${statistics.Butacas.total.toFixed(2)}`;

    document.getElementById('generalTickets').textContent = statistics.General.tickets;
    document.getElementById('generalTotal').textContent = `$${statistics.General.total.toFixed(2)}`;

    const totalTickets = statistics.VIP.tickets + statistics.Butacas.tickets + statistics.General.tickets;
    const totalRevenue = statistics.VIP.total + statistics.Butacas.total + statistics.General.total;

    document.getElementById('totalTickets').textContent = totalTickets;
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;

    updateTable();
}