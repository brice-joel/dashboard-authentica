<?php

namespace App\Http\Controllers;

use App\Mail\OrderWithdrawnInPickupPointMail;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $orders = Order::with('payments', 'products')->latest()->get();
        return inertia('Orders/Index', ['orders' => $orders]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id,  $type)
    {
        //
        switch ($type) {
            case 'validate-delivery':
                //mettre à jour la commande
                $order = Order::find($id);
                $order->update(['order_status' => 'DELIVERED']);
                //envoyé un mail à l'utilisateur pour la confirmation
                Mail::to($order->client_email)->send(new OrderWithdrawnInPickupPointMail($order));

                break;



            default:
                # code...
                break;
        }
        return redirect()->back()->with('success', 'Opération effectuée avec success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
