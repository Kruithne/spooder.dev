import { serve, caution } from 'spooder';

const server = serve(3002);

server.error((err: Error) => {
	caution(err);
	return new Response('The kākāpō has exploded (internal server error)', { status: 500 });
});

server.route('/test_response_code', (req: Request, url: URL) => {
	return 418; // I'm a teapot
});