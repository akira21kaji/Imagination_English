export async function GET() {
  return Response.json({
    status: 200,
    body: {
      message: 'Hello, World!'
    }
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  return Response.json({
    status: 200,
    body: {
      message: body.prompt
    }
  })
}
