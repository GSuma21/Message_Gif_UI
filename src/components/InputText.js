import React from "react";
import { v4 as uuid } from "uuid";
import  {CardGif}  from "./CardGif";
import  {CardText } from "./CardText";
import { GiphyFetch } from "@giphy/js-fetch-api";
import './InputText.css'

export const InputText = () => {
    const [input, setInput] = React.useState("");
    const [items, setItems] = React.useState([]);
    const [gifs, setGifs] = React.useState([]);
    // const key = process.env.GIPHY_KEY;
    // console.log(key);
    // EK5hwA46YU3VhkgHZ28mP4OTUH7rs8ro
    const giphy = new GiphyFetch("EK5hwA46YU3VhkgHZ28mP4OTUH7rs8ro");

    const handleImageClick = (id, url) => {
        const payLoad = {
            id,
            url
        }
        setItems([...items, payLoad])
        setGifs([])
    }

    const handleGif = async () => {
        if(input.length){
            const response = await giphy.search( input, { offset: 5, limit: 50 })
            const searchData = response.data
            const allSearchData = searchData.map((item) => {
                return {
                    url: item.images.downsized.url,
                    id: item.id
                }
            })
            setGifs(allSearchData)
            setInput("")
            return
        }
        const res = await giphy.trending({ offset: 5, limit: 50 })
        const myData = res.data
        const allData = myData.map((item) => {
            return {
                url: item.images.downsized.url,
                id: item.id
            }
        })
        setGifs(allData)
    
    }

    
    const handleClick = () => {
        const payLoad = {
            text: input,
            id: uuid()
        }
        setItems([...items, payLoad])
        setInput("")
    }

    return items.length || gifs.length ?
        <div className="input_main">
            <input type="text" placeholder="Add a comment....." value={input} onChange={(e) => setInput(e.target.value)} className="input" />
            <button onClick={handleClick} className="btn">Send</button>
            <button onClick={handleGif} className="btn">GIF</button>
            { gifs.length && <div className="input_gif">{
                gifs.map((item) => <div key={item.id} className="gifs-map">
                <img src={item.url} alt="gif_img" className="gifs-img" onClick={() => handleImageClick(item.id, item.url)} />
            </div>)
            }</div> }
            <div className="items-div">{items.map((item) => { return item.text ? <CardText key={item.id} text={item.text} /> : <CardGif key={item.id} url={item.url} />})}</div>
        </div> : <div className="input_main">
            <input type="text" placeholder="Add a comment....." value={input} onChange={(e) => setInput(e.target.value)} className="input" />
            <button onClick={handleClick} className="btn">Send</button>
            <button onClick={handleGif} className="btn">GIF</button>
            <div>....Empty</div>
        </div>

}