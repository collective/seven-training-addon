import prisma from '../lib/prisma';
import type { ActionFunctionArgs } from 'react-router';

type LikePayload = { count: number; pathname: string };

// GET /@likes/* → current count for the requested pathname
export async function loader({ params }: ActionFunctionArgs) {
  const pathname = params['*'] ? `/${params['*']}` : '/';
  const like = await prisma.urlLike.findUnique({ where: { pathname } });
  const payload: LikePayload = {
    pathname,
    count: like?.count ?? 0,
  };

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST /@likes/* → increment and return the updated record
export async function action({ params }: ActionFunctionArgs) {
  const pathname = params['*'] ? `/${params['*']}` : '/';
  const updatedRecord = await prisma.urlLike.upsert({
    where: { pathname },
    update: { count: { increment: 1 } },
    create: { pathname, count: 1 },
  });

  return new Response(JSON.stringify(updatedRecord), {
    headers: { 'Content-Type': 'application/json' },
  });
}
