// // app/api/admin/sms/send/route.ts
// import { NextResponse } from 'next/server';
// import twilio from 'twilio';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// if (!accountSid || !authToken || !fromNumber) {
//   throw new Error('Missing Twilio credentials');
// }

// const client = twilio(accountSid, authToken);

// export async function POST(request: Request) {
//   try {
//     const { to, message } = await request.json();

//     if (!to || !message) {
//       return NextResponse.json({ error: 'Missing "to" or "message"' }, { status: 400 });
//     }

//     const result = await client.messages.create({
//       body: message,
//       from: fromNumber,
//       to: to,
//     });

//     return NextResponse.json({ success: true, sid: result.sid });
//   } catch (error: any) {
//     console.error('SMS Error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Failed to send SMS' },
//       { status: 500 }
//     );
//   }
// }

// app/api/admin/sms/send/route.ts
import { NextResponse } from 'next/server';
// import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    // 🔍 Log raw body for debugging
    const body = await request.text();
    console.log('📨 Raw request body:', body);

    // Parse JSON
    const data = JSON.parse(body);
    const { to, message } = data;
    console.log('📤 SMS Request:', { to, message });

    // 🔑 Load credentials (DO NOT log full token in production!)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    console.log('🔧 TWILIO_ACCOUNT_SID exists:', !!accountSid);
    console.log('🔧 TWILIO_AUTH_TOKEN exists:', !!authToken);
    console.log('📞 TWILIO_PHONE_NUMBER:', fromNumber);

    if (!accountSid || !authToken || !fromNumber) {
      console.error('❌ Missing Twilio env vars!');
      return NextResponse.json(
        { error: 'Twilio not configured' },
        { status: 500 }
      );
    }

    // ✅ For now, SKIP Twilio send and simulate success
    console.log('✅ SMS would be sent (Twilio call skipped for testing)');
    
    // You can uncomment this later to enable real sending
    /*
    const client = twilio(accountSid, authToken);
    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: to,
    });
    console.log('✅ Twilio Response SID:', result.sid);
    */

    return NextResponse.json({ success: true, simulated: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('💥 SMS Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process SMS' },
      { status: 500 }
    );
  }
}