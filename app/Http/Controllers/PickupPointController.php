<?php

namespace App\Http\Controllers;

use App\Http\Requests\PickupPointFormRequest;
use App\Models\PickupPoint;
use Illuminate\Http\Request;

class PickupPointController extends Controller
{
    //
    public function index()
    {
        $pickup_points = PickupPoint::orderby('address', 'asc')->get();
        return inertia('PickupPoints/Index', [
            'pickup_points' => $pickup_points
        ]);
    }

    public function create() {}

    public function store(PickupPointFormRequest $request)
    {

        $pickup_point = $request->all();
        PickupPoint::create($pickup_point);
        return redirect()->back()->with('success', 'Le point de retrait a été enregistré avec success');
    }

    public function update(PickupPointFormRequest $request, $id)
    {

        PickupPoint::find($id)->update($request->all());
        return redirect()->back()->with('success', 'Le point de retrait a été mis à jour avec succès');
    }
    public function destroy($id)
    {
        PickupPoint::find($id)->delete();
        return redirect()->back()->with('success', 'Le point de retrait a été supprimé avec success');
    }
}
