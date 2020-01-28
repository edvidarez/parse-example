// check if env variables are set, then create S3 adapter
const filesAdapter =
  process.env.S3_SECRET_KEY &&
  process.env.S3_ACCESS_KEY &&
  process.env.S3_BUCKET
    ? {
        module: "@parse/s3-files-adapter",
        options: { directAccess: true },
      }
    : undefined;
export default filesAdapter;
