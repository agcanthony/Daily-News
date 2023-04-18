import { NextResponse } from 'next/server';
import { getAllErrors } from '../comum';

export const ROUTE = 'comentarios';

export async function GET() {
   const res = await fetch(process.env.API_URL + ROUTE, { cache: 'no-store' });

   if (res.status === 200) {
      const data = await res.json();
      
return NextResponse.json(data);
   }
   else {
      const error = await res.text();
      
return new NextResponse(null, { status: 400, statusText: error });
   }
}

export async function POST(req) {
    var args = {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
       },
       cache: 'no-store',
       body: JSON.stringify(await req.json())
    };
    const res = await fetch(process.env.API_URL + ROUTE, args);
    if (res.status === 200) {
       const data = await res.json();
       
return NextResponse.json(data);
    }
    else {
       let errorMessage = await getAllErrors(await res.json());
       
return new NextResponse(null, { status: 400, statusText: errorMessage });
    }
 }