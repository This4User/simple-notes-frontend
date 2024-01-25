import {useEffect, useMemo, useState} from "react"
import {getContrastingColor} from "./colorUtils.js";
import {baseUrl, getAllNotes, updateNote} from "./api.js";

function App() {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);

    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");

    const contrastingColor = useMemo(
        () =>
            currentNote != null ? getContrastingColor(currentNote.color) : "fff",
        [currentNote],
    );

    useEffect(() => {
        getAllNotes(setNotes);
    }, []);

    useEffect(() => {
        if (currentNote == null) return;

        setNoteTitle(currentNote.title);
        setNoteText(currentNote.text);
    }, [currentNote]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 20,
                    padding: 20,
                }}
            >
                {
                    notes.map((e) => <div
                        key={e.id}
                        onClick={() => setCurrentNote(e)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            background: `#${e.color}`,
                            color: getContrastingColor(e.color),
                            fontSize: 18,
                            padding: 10,
                            borderRadius: 10,
                            cursor: "pointer",
                            width: 500,
                            maxHeight: 300,
                            overflow: "hidden",
                            userSelect: "none",
                        }}
                    >
                        <div>{e.title}</div>
                        <div>{e.text}</div>
                    </div>)
                }
            </div>
            {
                currentNote != null && <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        zIndex: 100,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                >
                    <div
                        onClick={() => setCurrentNote(null)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100vw",
                            height: "100vh",
                            background: "grey",
                            opacity: 0.4,
                            zIndex: 150,
                            position: "absolute",
                            cursor: "pointer",
                        }}
                    >

                    </div>
                    <div
                        style={{
                            width: "85vw",
                            height: "85vh",
                            background: `#${currentNote.color}`,
                            cursor: "default",
                            position: "absolute",
                            top: "calc(50% - 85vh/2)",
                            left: "calc(50% - 85vw/2)",
                            borderRadius: 30,
                            zIndex: 200,
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3)" +
                                " 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                            padding: 30,
                            display: "flex",
                            alignItems: "start",
                            flexDirection: "column",
                        }}
                    >
                        <input
                            style={{
                                all: "unset",
                                fontSize: 46,
                                color: contrastingColor
                            }}
                            color={contrastingColor}
                            value={noteTitle}
                            onChange={({target: {value}}) => setNoteTitle(value)}
                            placeholder={"Название"}
                            type="text"
                        />
                        <textarea
                            style={{
                                all: "unset",
                                fontSize: 36,
                                width: "100%",
                                maxWidth: "100%",
                                height: "100%",
                                wordBreak: "break-all",
                                textWrap: "unrestricted",
                                color: contrastingColor
                            }}
                            value={noteText}
                            onChange={({target: {value}}) => setNoteText(value)}
                            placeholder={"Название"}
                        />
                        <div
                            onClick={function () {
                                const newNote = {
                                    ...currentNote,
                                    title: noteTitle,
                                    text: noteText,
                                    color: "FBF8CC",
                                    tags: [],
                                    reminder: null,
                                    expires: null,
                                };

                                updateNote(newNote);
                                setNotes((prevState) => [newNote, ...prevState]);
                                setCurrentNote(null);
                            }}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                position: "relative",
                                left: "calc(100% - 60px)",
                                width: 60,
                                height: 60,
                                borderRadius: 12,
                                padding: 8,
                                fontSize: 45,
                                userSelect: "none",
                                lineHeight: "100%",
                                background: "grey",
                                color: "black",
                            }}
                        >
                            <svg width="800px" height="800px" viewBox="0 0 28 28" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.65263 14.0304C6.29251 13.6703 6.29251 13.0864 6.65263 12.7263C7.01276 12.3662 7.59663 12.3662 7.95676 12.7263L11.6602 16.4297L19.438 8.65183C19.7981 8.29171 20.382 8.29171 20.7421 8.65183C21.1023 9.01195 21.1023 9.59583 20.7421 9.95596L12.3667 18.3314C11.9762 18.7219 11.343 18.7219 10.9525 18.3314L6.65263 14.0304Z"
                                    fill="#000000"/>
                                <path clipRule="evenodd"
                                      d="M14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1ZM3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14Z"
                                      fill="#000000" fillRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </div>
            }
            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    bottom: 50,
                    right: 50,
                }}
            >
                <div
                    onClick={() => setCurrentNote({
                        title: "",
                        text: "",
                        color: "FBF8CC",
                    })}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        width: 60,
                        height: 60,
                        borderRadius: 12,
                        padding: 8,
                        fontSize: 45,
                        userSelect: "none",
                        lineHeight: "100%",
                        background: "grey",
                        color: "black",
                    }}
                >
                    <svg width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                         fill="none">
                        <path fill="#000000"
                              d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0
                          zm14 .069a1 1 0 01-1 1h-2.931V14a1 1 0 11-2 0v
                          -2.931H6a1 1 0 110-2h3.069V6a1 1 0 112 0v3.069H14a1 1 0 011 1z"/>
                    </svg>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    bottom: 50,
                    right: 50,
                    overflow: "hidden",
                }}
            >
                <a
                    download
                    href={`${baseUrl}pdf`}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        width: 60,
                        height: 60,
                        borderRadius: 12,
                        padding: 8,
                        fontSize: 45,
                        userSelect: "none",
                        lineHeight: "100%",
                        background: "grey",
                        color: "black",
                    }}
                >
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 12L12 16M12 16L16 12M12 16V8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
                <div
                    onClick={() => setCurrentNote({
                        title: "",
                        text: "",
                        color: "FBF8CC",
                    })}
                    style={{
                        marginLeft: 15,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        width: 60,
                        height: 60,
                        borderRadius: 12,
                        padding: 8,
                        fontSize: 45,
                        userSelect: "none",
                        lineHeight: "100%",
                        background: "grey",
                        color: "black",
                    }}
                >
                    <svg width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                         fill="none">
                        <path fill="#000000"
                              d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0
                          zm14 .069a1 1 0 01-1 1h-2.931V14a1 1 0 11-2 0v
                          -2.931H6a1 1 0 110-2h3.069V6a1 1 0 112 0v3.069H14a1 1 0 011 1z"/>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default App
