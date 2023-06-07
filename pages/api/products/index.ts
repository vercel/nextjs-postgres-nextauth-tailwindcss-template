import 'server-only';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { queryBuilder } from 'lib/planetscale';

const addProduct = async (req: any, res: any) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(req)

  if (req.method === 'POST' && session) {
    const { id, nombre, composicion, tipo, grupo, para, dosis, cuando, cultivo, ps, notas } = req.body;
    await queryBuilder
      .insertInto('productos')
      .values([
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
      ])
      .execute();
    res.status(200).end();
  } else {
    res.status(403).json({
      message:
        'You must be sign in to view the protected content on this page.'
    }).end();
  }

  res.status(500).end();
};

export default addProduct;