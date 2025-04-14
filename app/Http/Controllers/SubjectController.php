<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Http::auth()->get("/subject")->json();

        return Inertia::render("subjects/index", [
            "subjects" => $subjects
        ]);
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
        $request->validate([
            "code" => "required|string",
            "title" => "required|string",
            "years" => "required",
            "years.*" => ["string", Rule::in(["First", "Second", "Third", "Fourth"])]
        ], [
            "years" => [
                "required" => "Must select at least one year level."
            ]
        ]);

        $response = Http::auth()->post("subject/store", [
            "code" => $request->code,
            "title" => $request->title,
            "years" => $request->years,
        ]);
        
        if ($response->unprocessableEntity()) {
            return back()->withErrors($response->json()["errors"]);
        }

        $subject = $response->json();

        return redirect(route("subject.index"))->with("success", [
            "header" => "Subject Created Successfully!",
            "body" => $subject['code'] . " - " . $subject['title'],
        ]);
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
