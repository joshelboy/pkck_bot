/**
 * @description Calls generateW2G every day at 6:00 p.m.
 */
const nodeCron = require('node-cron');
const generateW2G = require('./scripts/generateW2G');
const mfTracker = require('./scripts/mfTracker')

async function generate(){
    await generateW2G.execute();
}

async function fetch(){
    await mfTracker.execute();
}

/*
    *      *      *    *          *     *
    second minute hour dayOfMonth month dayOfWeek
 */
const jobW2G = nodeCron.schedule("0 0 18 * * *", generate);
const jobMF = nodeCron.schedule("0 1 * * * *", fetch)