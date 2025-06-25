const ctx = document.getElementById('expenseChart').getContext('2d');

let categories = [];
let amounts = [];

const expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: categories,
        datasets: [{
            label: 'Expenses',
            data: amounts,
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                '#9966FF', '#FF9F40', '#8BC34A', '#E91E63'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const categoryInput = document.getElementById('category');
    const amountInput = document.getElementById('amount');

    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (category && amount > 0) {
        const existingIndex = categories.indexOf(category);

        if (existingIndex === -1) {
            // New category
            categories.push(category);
            amounts.push(amount);
        } else {
            // Replace existing amount for the category
            amounts[existingIndex] = amount;
        }

        expenseChart.data.labels = categories;
        expenseChart.data.datasets[0].data = amounts;
        expenseChart.update();

        categoryInput.value = '';
        amountInput.value = '';
    }
});
