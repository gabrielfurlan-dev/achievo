import { PrismaClient } from "@prisma/client";

export async function colors(prisma: PrismaClient){
    await prisma.color.upsert({
            where: { hexCode: "BC9B75" },
            update: {},
            create: {
                name: "Almond Latte",
                hexCode: "BC9B75"
            }})
    await prisma.color.upsert({
            where: { hexCode: "F4D271" },
            update: {},
            create: {
                name: "Lemon Chiffon",
                hexCode: "F4D271",
            }})
    await prisma.color.upsert({
        where: { hexCode: "F2A362" },
        update: {},
        create: {
            name: "Apricot Peach",
            hexCode: "F2A362",
        }})
    await prisma.color.upsert({
        where: { hexCode: "CF8DB2" },
        update: {},
        create: {
            name: "Rose Meringue",
            hexCode: "CF8DB2",
        }})
    await prisma.color.upsert({
        where: { hexCode: "B7436D" },
        update: {},
        create: {
            name: "Berry Blush",
            hexCode: "B7436D",
        }})
    await prisma.color.upsert({
        where: { hexCode: "A9394A" },
        update: {},
        create: {
            name: "Cranberry Wine",
            hexCode: "A9394A",
        }})
    await prisma.color.upsert({
        where: { hexCode: "DD9980" },
        update: {},
        create: {
            name: "Coral Sand",
            hexCode: "DD9980",
        }})
    await prisma.color.upsert({
        where: { hexCode: "D97251" },
        update: {},
        create: {
            name: "Terracotta Sunset",
            hexCode: "D97251",
        }})
    await prisma.color.upsert({
        where: { hexCode: "CD4945" },
        update: {},
        create: {
            name: "Cherry Rouge",
            hexCode: "CD4945",
        }})
    await prisma.color.upsert({
        where: { hexCode: "5B8DBE" },
        update: {},
        create: {
            name: "Sapphire Wave",
            hexCode: "5B8DBE",
        }})
    await prisma.color.upsert({
        where: { hexCode: "41549B" },
        update: {},
        create: {
            name: "Twilight Navy",
            hexCode: "41549B",
        }})
    await prisma.color.upsert({
        where: { hexCode: "273960" },
        update: {},
        create: {
            name: "Midnight Blue",
            hexCode: "273960",
        }})
    await prisma.color.upsert({
        where: { hexCode: "A6BB9A" },
        update: {},
        create: {
            name: "Mint Whisper",
            hexCode: "A6BB9A",
        }})
    await prisma.color.upsert({
        where: { hexCode: "83B984" },
        update: {},
        create: {
            name: "Meadow Green",
            hexCode: "83B984",
        }})
    await prisma.color.upsert({
        where: { hexCode: "2D6B6F" },
        update: {},
        create: {
            name: "Teal Depth",
            hexCode: "2D6B6F",
        }})
    await prisma.color.upsert({
        where: { hexCode: "1A1A1A" },
        update: {},
        create: {
            name: "Black Cat",
            hexCode: "1A1A1A",
        }})
    await prisma.color.upsert({
        where: { hexCode: "AD7AF1" },
        update: {},
        create: {
            name: "Periwinkle Dream",
            hexCode: "AD7AF1",
        }})
    await prisma.color.upsert({
        where: { hexCode: "7048E8" },
        update: {},
        create: {
            name: "Iris Bliss",
            hexCode: "7048E8",
        }})
    await prisma.color.upsert({
        where: { hexCode: "FFFFFF" },
        update: {},
        create: {
            name: "Pure White",
            hexCode: "FFFFFF",
        }})
    await prisma.color.upsert({
        where: { hexCode: "595959" },
        update: {},
        create: {
            name: "Slate Gray",
            hexCode: "595959",
        }})
    await prisma.color.upsert({
        where: { hexCode: "222222" },
        update: {},
        create: {
            name: "Onyx Blac",
            hexCode: "222222",
        }})
}

