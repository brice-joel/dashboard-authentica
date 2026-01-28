<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        $order_sell = Order::whereMonth('created_at', date('m'))->sum('order_amount');   // afficher les ventes du mois actuelle
        $order_count = Order::whereMonth('created_at', date('m'))->where('order_status', 'DELIVERED')->count(); //commande totale traité
        $product_count = Product::count(); // nombre de produit
        //        dd($product_count);
        $orders_recent = Order::orderBy('created_at', 'desc')->take(4)->get(); // les dernieres commandes       
        return inertia('Dashboard');
    }
}
