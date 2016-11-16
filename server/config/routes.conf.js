import HydrometryRoutes from '../api/hydrometry';

export function initRoutes (app) {
  const startTime = new Date();

  // Insert routes below
  app.use('/api/hydrometries', HydrometryRoutes);

  app.route('/*')
    .get((req, res) => {
        const uptime = `${new Date() - startTime}ms`;
        res.status(200).json({ startTime, uptime });
      }
    );

}
