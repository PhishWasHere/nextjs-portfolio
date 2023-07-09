

import repoSchema from "@/models/RepoSchema";
import { NextResponse } from 'next/server';

export async function GET(){
    try{
        const data = await repoSchema.find({}).sort({updated_at: -1}).limit(8); // sort by updated_at in descending order, limit to 8
        return NextResponse.json(data);
    } catch(err) {
        console.log(err);
        return NextResponse.error(500, "Internal Server Error");
    }
}