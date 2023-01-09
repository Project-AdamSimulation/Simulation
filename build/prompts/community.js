"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNITY_CHANGE_SUBJECT = exports.COMMUNITY_REMOVE = exports.COMMUNITY_ADD = exports.COMMUNITY_ONGOING = exports.COMMUNITY_INIT = void 0;
const mapList_1 = require("./helpers/mapList");
const COMMUNITY_BASE = "This is a conversation between a group of humans. The group can have one or more than one individual. When the group contains a single person, he/she simply talks to himself/herself.\n\n";
const COMMUNITY_INIT = ({ initMembers, topic, }) => initMembers.length == 1
    ? COMMUNITY_BASE +
        `The group initially contains a single person named ${initMembers[0].name}. The following is ${initMembers[0].name}'s description:\n${initMembers[0].desc}\n\nThe following is a topic using which the initial ideas in the conversation should originate.\nTopic: ${topic}\n\n`
    : COMMUNITY_BASE +
        `The group initially contains ${initMembers.length} members, ${(0, mapList_1.mapList)(initMembers.map((member) => member.name))}. The following are their descriptions:\n\n${initMembers
            .map((member) => member.name + ":\n\n" + member.desc)
            .join("\n\n")}\n\nThe following is a topic using which the initial ideas in the conversation should originate.\nTopic: ${topic}\n\n`;
exports.COMMUNITY_INIT = COMMUNITY_INIT;
const COMMUNITY_ONGOING = ({ members, prevConversation, }) => members.length == 1
    ? COMMUNITY_BASE +
        `The group contains a single person named ${members[0].name}. The following is ${members[0].name}'s description:\n${members[0].desc}\n\nSome previous conversation is already provided. Continue the conversation.\n\n${prevConversation}\n\n`
    : COMMUNITY_BASE +
        `The group contains ${members.length} members, ${(0, mapList_1.mapList)(members.map((member) => member.name))}. The following are their descriptions:\n\n${members
            .map((member) => member.name + ":\n\n" + member.desc)
            .join("\n\n")}\n\nSome previous conversation is already provided. Continue the conversation.\n\n${prevConversation}\n\n`;
exports.COMMUNITY_ONGOING = COMMUNITY_ONGOING;
const COMMUNITY_ADD = ({ members, aware, }) => members.length == 1
    ? `${members[0].name} enters the scene. The following is ${members[0].name}'s description:\n${members[0].desc}\n\n${members[0].name} is ${aware.length == 0 ? "unaware" : "aware"} of the previous conversations or context.\n\n`
    : `${(0, mapList_1.mapList)(members.map((member) => member.name))} enter the scene. The following are their descriptions:\n\n${members
        .map((member) => member.name + ":\n\n" + member.desc)
        .join("\n\n")}.\n\n${aware.length == 0
        ? "Everyone is unaware"
        : (0, mapList_1.mapList)(aware.map((member) => member.name)) +
            (aware.length == 1 ? " is aware" : " are aware")} of the previous conversations or context.\n\n`;
exports.COMMUNITY_ADD = COMMUNITY_ADD;
const COMMUNITY_REMOVE = ({ pointMakers, others, }) => pointMakers.length == 1
    ? `${pointMakers[0].name} makes a point to ${others.length == 0
        ? "leave the conversation in the next dialogue\n\n"
        : `make ${(0, mapList_1.mapList)(others.map((member) => member.name))} leave the conversation in the next dialogue\n\n`}`
    : `${(0, mapList_1.mapList)(pointMakers.map((member) => member.name))} make a point to ${others.length == 0
        ? "leave the conversation in the next dialogue\n\n"
        : `make ${(0, mapList_1.mapList)(others.map((member) => member.name))} leave the conversation in the next dialogue\n\n`}`;
exports.COMMUNITY_REMOVE = COMMUNITY_REMOVE;
const COMMUNITY_CHANGE_SUBJECT = ({ changers }) => changers.length == 1
    ? `${changers[0].name} changes the subject of the conversation`
    : `${(0, mapList_1.mapList)(changers.map((member) => member.name))} change the subject of the conversation`;
exports.COMMUNITY_CHANGE_SUBJECT = COMMUNITY_CHANGE_SUBJECT;
