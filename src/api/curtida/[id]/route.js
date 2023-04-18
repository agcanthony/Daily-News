import { NextResponse } from 'next/server';
import { ROUTE } from '../route';

export async function GET(request, { params }) {
    const res = await fetch(process.env.API_URL + ROUTE + '/' + params.id, { cache: 'no-store' });

    if (res.status === 200) {
        const data = await res.json();
        
return NextResponse.json(data);
    }
    else {
        const error = await res.text();
        
return new NextResponse(null, { status: 400, statusText: error });
    }
}

export async function PUT(req, { params }) {
    var args = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
        body: JSON.stringify(await req.json())
    };

    const res = await fetch(process.env.API_URL + ROUTE + "/" + params.id, args);

    if (res.status === 200) {
        const data = await res.json();
        
return NextResponse.json(data);
    }
    else {
        let errorMessage = await getAllErrors(await res.json());
        
return new NextResponse(null, { status: 400, statusText: errorMessage });
     }
}

export async function DELETE(req, { params }) {
    var args = {
        method: 'DELETE',
    };

    const res = await fetch(process.env.API_URL + ROUTE + "/" + params.id, args);

    if (res.status === 200) {
        const data = await res.text();
        
return NextResponse.json(data);
    }
    else {
        const error = await res.text();
        
return new NextResponse(null, { status: 400, statusText: error });
    }
}