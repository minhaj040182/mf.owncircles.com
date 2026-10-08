<?php
require_once __DIR__ . '/config.php';

$farmId = isset($_GET['farm_id']) ? intval($_GET['farm_id']) : 1;

// Total Expenses
$expStmt = $pdo->prepare("SELECT SUM(amount) as total_expenses, COUNT(*) as expense_count FROM expenses WHERE farm_id = ?");
$expStmt->execute([$farmId]);
$expSummary = $expStmt->fetch();

// Total Sales
$saleStmt = $pdo->prepare("SELECT SUM(total_amount) as total_revenue, SUM(quantity_kg) as total_fish_sold_kg, COUNT(*) as sales_count FROM harvest_sales WHERE farm_id = ?");
$saleStmt->execute([$farmId]);
$saleSummary = $saleStmt->fetch();

// Category-wise expenses
$catStmt = $pdo->prepare("SELECT category, SUM(amount) as category_total FROM expenses WHERE farm_id = ? GROUP BY category ORDER BY category_total DESC");
$catStmt->execute([$farmId]);
$categories = $catStmt->fetchAll();

$totalExpenses = floatval($expSummary['total_expenses'] ?? 0);
$totalRevenue = floatval($saleSummary['total_revenue'] ?? 0);
$netProfit = $totalRevenue - $totalExpenses;
$profitMargin = $totalRevenue > 0 ? round(($netProfit / $totalRevenue) * 100, 1) : 0;

echo json_encode([
    'success' => true,
    'data' => [
        'total_revenue' => $totalRevenue,
        'total_expenses' => $totalExpenses,
        'net_profit' => $netProfit,
        'profit_margin_percent' => $profitMargin,
        'total_fish_sold_kg' => floatval($saleSummary['total_fish_sold_kg'] ?? 0),
        'sales_count' => intval($saleSummary['sales_count'] ?? 0),
        'expense_count' => intval($expSummary['expense_count'] ?? 0),
        'category_breakdown' => $categories
    ]
]);
