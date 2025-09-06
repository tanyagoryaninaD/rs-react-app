import { NextResponse } from 'next/server';
import { MyPokemon } from '../../types/pokemon-components';

export async function POST(request: Request): Promise<NextResponse> {
  const data: MyPokemon[] = await request.json();

  const headers = Object.keys(data[0]).join(',');

  const rows = Object.values(data)
    .map((item) => {
      const abilities = item.abilities?.join(', ');
      const moves = item.moves?.join(', ');

      return [item.name, item.id, item.image, abilities, moves]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    })
    .join('\n');

  const csvText = [headers, rows].join('\n');

  return new NextResponse(csvText);
}
