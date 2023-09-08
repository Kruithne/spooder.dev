import { serve, caution, ServerStop } from 'spooder';

const server = serve(3002);

server.error((err: Error) => {
	caution(err);
	return new Response('The kākāpō has exploded (internal server error)', { status: 500 });
});

server.route('/internal/update', (req: Request, url: URL) => {
	if (url.searchParams.get('key') !== process.env.SPOODER_UPDATE_KEY)
		return 401; // unauthorized

	server.stop(ServerStop.GRACEFUL);
	return 200; // ok
});

server.route('/test_response_code', (req: Request, url: URL) => {
	return 418; // i'm a teapot
});