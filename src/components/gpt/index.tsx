'use client'

import React from "react";
import { useState, useEffect } from "react";
import { NextResponse } from 'next/server'
import { useChat } from 'ai/react';


export default function GPT() {

    const { messages, input, handleInputChange, handleSubmit } = useChat() //code i just copy paste from docs
    const [chatHistory, setChatHistory] = useState([])

    // useEffect(() => {
    //     setChatHistory((prevChatHistory) => [...prevChatHistory, ...messages]);
    //     console.log(chatHistory);
    // }, [messages]);

    return(
        <div className="w-5/6 bg-red-600 rounded-sm mx-auto">
            <div className=" max-h-96 overflow-y-auto">
            {messages.length > 0
                ? messages.map(m => (
                    <div key={m.id} className="ml-2">
                      {m.role === 'user' ? 'User: ' : 'GPT: '}
                      {m.content}
                    </div>
                  ))
                : null}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                  className="rounded-md border border-gray-300 px-4 py-2 w-full"
                  value={input}
                  placeholder="Say something..."
                  onChange={handleInputChange}
                />
            </form>
        </div>
    );
}