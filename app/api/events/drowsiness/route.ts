import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { status, timestamp } = body;

        console.log(` [EVENT] Driver Status Change: ${status} at ${new Date(timestamp).toISOString()}`);

        // TODO: Save to Database (Postgres/Supabase)
        // await db.insert(events).values({ status, timestamp, userId: ... });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
}
