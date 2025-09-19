// components/Win95Icons.tsx — simplified icon loader that uses PNG assets from /public/icons_1024x1024
"use client";
import React from "react";
import Image from "next/image";

export type IconName =
    | "three_d_graphics_file"
    | "three_d_graphics_program"
    | "aseprite_file"
    | "aseprite"
    | "audio_editor"
    | "audio_file"
    | "audio_music_file"
    | "briefcase"
    | "calculator"
    | "calendar"
    | "camera"
    | "cd_drive"
    | "chrome"
    | "clock"
    | "contact_book"
    | "discord"
    | "drive"
    | "firefox"
    | "flop_drive"
    | "folder_closed"
    | "folder_dark"
    | "folder_open"
    | "games"
    | "gihtub"
    | "image_editor"
    | "image_file"
    | "mail"
    | "microphone"
    | "minecraft"
    | "movies"
    | "music"
    | "news"
    | "notepad"
    | "paint_alt"
    | "paint"
    | "parsec"
    | "password_manager"
    | "phone"
    | "printer"
    | "program"
    | "recycle_bin_full"
    | "recycle_bin"
    | "script_file"
    | "search"
    | "slack"
    | "sounds"
    | "spreadsheet_file"
    | "spreadsheet_program"
    | "stardew_valley"
    | "steam"
    | "sticky_note"
    | "text_editor"
    | "text_file_2"
    | "text_file"
    | "text_file2"
    | "this_computer"
    | "tools"
    | "video_editor"
    | "video_file"
    | "video_movie_editor"
    | "vlc"
    | "webpage_file"
    | "workspace"
    | "world";

// include some common alias names so older code keeps working
export type AnyIconName = IconName
    | "computer"
    | "folder"
    | "file"
    | "notepad"
    | "paint"
    | "settings"
    | "volume"
    | "start"
    | "github"
    | "gihtub";

const ICON_MAP: Record<AnyIconName, string> = {
    three_d_graphics_file: "3d_graphics_file.png",
    three_d_graphics_program: "3d_graphics_program.png",
    aseprite_file: "aseprite_file.png",
    aseprite: "aseprite.png",
    audio_editor: "audio_editor.png",
    audio_file: "audio_file.png",
    audio_music_file: "audio_music_file.png",
    briefcase: "briefcase.png",
    calculator: "calculator.png",
    calendar: "calendar.png",
    camera: "camera.png",
    cd_drive: "cd_drive.png",
    chrome: "chrome.png",
    clock: "clock.png",
    contact_book: "contact_book.png",
    discord: "discord.png",
    drive: "drive.png",
    firefox: "firefox.png",
    flop_drive: "flop_drive.png",
    folder_closed: "folder_closed.png",
    folder_dark: "folder_dark.png",
    folder_open: "folder_open.png",
    games: "games.png",
    gihtub: "gihtub.png",
    image_editor: "image_editor.png",
    image_file: "image_file.png",
    mail: "mail.png",
    microphone: "microphone.png",
    minecraft: "minecraft.png",
    movies: "movies.png",
    music: "music.png",
    news: "news.png",
    paint_alt: "paint_alt.png",
    parsec: "parsec.png",
    password_manager: "password_manager.png",
    phone: "phone.png",
    printer: "printer.png",
    program: "program.png",
    recycle_bin_full: "recycle_bin_full.png",
    recycle_bin: "recycle_bin.png",
    script_file: "script_file.png",
    search: "search.png",
    slack: "slack.png",
    sounds: "sounds.png",
    spreadsheet_file: "spreadsheet_file.png",
    spreadsheet_program: "spreadsheet_program.png",
    stardew_valley: "stardew_valley.png",
    steam: "steam.png",
    sticky_note: "sticky_note.png",
    text_editor: "text_editor.png",
    text_file_2: "text_file_2.png",
    text_file: "text_file.png",
    text_file2: "text_file2.png",
    this_computer: "this_computer.png",
    tools: "tools.png",
    video_editor: "video_editor.png",
    video_file: "video_file.png",
    video_movie_editor: "video_movie_editor.png",
    vlc: "vlc.png",
    webpage_file: "webpage_file.png",
    workspace: "workspace.png",
    world: "world.png",
    // aliases
    computer: "this_computer.png",
    folder: "folder_closed.png",
    file: "text_file.png",
    notepad: "notepad.png",
    paint: "paint.png",
    settings: "tools.png",
    volume: "sounds.png",
    start: "world.png",
    github: "gihtub.png",
};

export function Win95Icon({ name, size = 16, className }: { name: AnyIconName; size?: number; className?: string }) {
    const src = `/icons_1024x1024/${ICON_MAP[name]}`;
    return (
        <span style={{ width: size, height: size, display: "inline-block", lineHeight: 0 }} className={className}>
            <Image src={src} width={size} height={size} alt={name} style={{ imageRendering: "pixelated" }} />
        </span>
    );
}