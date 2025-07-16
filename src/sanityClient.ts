import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'xj6d9kyg',
  dataset: 'production',
  apiVersion: '2025-07-12',
  token: 'skagQs3rarQlNR7qA7NQXu5BOMtvHDzG5InvfCLRNYEr6aEQHKRFchkFJl0IhsMx8oKaiOHieLkUC7TTJbZuv9bl6hLhzLXid6QL0rsWafcLQH6WeKhdU2P1THCv6b0zK3O4VDPt8Cm23ZXPITOiCLWZm1wfvWItRRkzXzTsLFg0IJch1tv0',
  useCdn: false, // Set to false for write operations
});

export default client; 