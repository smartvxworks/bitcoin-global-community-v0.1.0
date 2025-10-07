import { promises as fs } from 'fs';
import path from 'path';

async function copyPrismaFiles() {
  try {
    const srcDir = path.join(process.cwd(), 'prisma');
    const destDir = path.join(process.cwd(), 'dist', 'src', 'prisma');

    // 确保目标目录存在
    await fs.mkdir(destDir, { recursive: true });

    // 复制所有文件
    const files = await fs.readdir(srcDir);
    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      await fs.copyFile(srcPath, destPath);
    }

    console.log('Prisma files copied successfully');
  } catch (error) {
    console.error('Error copying prisma files:', error);
    process.exit(1);
  }
}

copyPrismaFiles();