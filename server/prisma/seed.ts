import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const courses = [
    { title: "比特币基础知识", description: "了解比特币的基本概念、历史和工作原理", level: "入门", duration: "3小时", imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20basics%20course" },
    { title: "区块链技术原理", description: "深入理解区块链技术的核心原理和运作机制", level: "进阶", duration: "5小时", imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20technology%20course" }
  ];
  const tutorials = [
    { title: "如何安全存储比特币", description: "了解不同类型的钱包及其安全特性", category: "安全", author: "区块链专家", date: "2025-09-15", readTime: "8分钟", imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20wallet%20security%20guide" },
    { title: "比特币交易基础教程", description: "学习在交易所进行买卖交易的基础", category: "交易", author: "加密货币分析师", date: "2025-09-10", readTime: "12分钟", imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20trading%20tutorial" }
  ];
  const discussions = [
    { title: "比特币价格突破10万美元，是继续持有还是获利了结？", content: "欢迎讨论你的观点", authorPhone: "00000000000" },
    { title: "新手提问：如何选择安全的比特币钱包？", content: "分享你的钱包使用经验", authorPhone: "00000000000" }
  ];

  await prisma.course.createMany({ data: courses });
  await prisma.tutorial.createMany({ data: tutorials });
  await prisma.discussion.createMany({ data: discussions });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });