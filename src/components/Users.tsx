//import "./App.css";
import { useState } from "react";
import React from "react";
import { Form } from "react-bootstrap";

export function UserName({ Names }: { Names: string[] }): JSX.Element {
    const [name, setName] = useState<string>("");

    function updateName(event: React.ChangeEvent<HTMLSelectElement>) {
        setName(event.target.value);
    }

    return (
        <div>
            <Form.Group controlId="userchoices">
                <Form.Label>Choose Your Name</Form.Label>
                <Form.Select value={name} onChange={updateName}>
                    {Names.map((name: string) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {name}s Movie List:.
        </div>
    );
}
