import { forwardRef, useState, useRef, useEffect } from "react";
import {data as emojiList} from "./data";
import EmojiButton from "./emojiButton";
import EmojiSearch from "./emojiSearch";

export function EmojiPicker(props, inputRef){

    const [isOpen, setIsOpen] = useState(false); 
    const [emojis, setEmojis] = useState ([...emojiList]);

    const containerRef = useRef(null);

    useEffect(() => {
        window.addEventListener('click', e => {
            if(!containerRef.current.contains(e.target)){
                setIsOpen(false);
                setEmojis(emojiList);
            }
        })
    }, []);

    function handleClickOpen(){
        setIsOpen(!isOpen)
    }

    function handleSearch(e){
        const q = e;
    
            if(!! q){
                const search = emojiList.filter(emoji => {
                    return (
                        emoji.name.toLowerCase().includes(q) || 
                        emoji.keywords.toLowerCase().includes(q)
                    );
                });
                setEmojis(search)
            }else{
                setEmojis(emojiList);
            }
        }

    function handleOnClickEmoji(emoji){
        const cursosPos = inputRef.current.selectionStart;
        const text = inputRef.current.value;
        const prev = text.slice(0, cursosPos);
        const next = text.slice(cursosPos);

        inputRef.current.value = prev + emoji.symbol + next;
        inputRef.current.selectionStart = cursosPos + emoji.symbol.length;
        inputRef.current.selectionEnd = cursosPos + emoji.symbol.length;
        inputRef.current.focus();

    }

    return(
        <div ref={containerRef}>
            <button onClick={handleClickOpen}>😔</button>

        {isOpen ? (
        <div>
            <EmojiSearch onSearch={handleSearch}/>
            <div>
                {emojis.map((emoji) =>( 
                    <EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji} />
                ))}</div>
        </div>
        ) : (
            ""
        )}
        </div>
    ) 
}

export default forwardRef(EmojiPicker);