<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class InstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $instructors = Http::auth()->get("/instructor")->json();

        return Inertia::render("instructors/index", [
            "instructors" => $instructors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subjects = Http::auth()->get("/subject")->json();

        return Inertia::render("instructors/create", [
            "subjects" => $subjects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "school_id" => ["string", "required"],
            "name" => ["string", "required"],
            "subjects" => ["required"],
            "subjects.*" => ["numeric"],
            "days" => ["required"],
            "days.*" => ["string", Rule::in(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])],
        ], [
            "subjects" => [
                "required" => "Must select at least one subject.",
            ],
            "days" => [
                "required" => "Must select at least on preferred day.",
            ]
        ]);

        $response = Http::auth()->post("instructor/store", [
            "school_id" => $request->school_id,
            "name" => $request->name,
            "subjects" => $request->subjects,
            "days" => $request->days,
        ]);

        if ($response->unprocessableEntity()) {
            return back()->withErrors($response->json()["errors"]);
        }

        return redirect()->route("instructor.index");
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
