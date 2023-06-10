import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { queryBuilder } from 'lib/planetscale';

export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { id, nombre, composicion, tipo, grupo, para, dosis, cuando, cultivo, ps, notas } = req.body;

    if(!nombre) res.status(400).json({ message: 'El nombre es obligatorio' }).end();

    await queryBuilder
      .insertInto('productos')
      .values({
        id,
        nombre,
        composicion,
        tipo,
        grupo,
        para,
        dosis,
        cuando,
        cultivo,
        ps,
        notas
      })
      .execute();
    return res.status(200).redirect(307, "/");
  } else {
    res.status(403).json({
      message:
        'You must be sign in to view the protected content on this page.'
    }).end();
  }

}