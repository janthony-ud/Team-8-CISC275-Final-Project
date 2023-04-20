import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { User } from "../interfaces/user";

export function UserDropdown({ options }: { options: string[] }): JSX.Element {
    const [user, setUser] = useState<string>("user");
    function updateSelected(event: React.ChangeEvent<HTMLSelectElement>) {
        setUser(event.target.value);
    }

    return (
        <div>
            <Form.Group controlId="formUserSelect">
                <h3>Select Your User</h3>
                <Form.Select value={user} onChange={updateSelected}>
                    {options.map((usertype: string) => (
                        <option key={usertype} value={usertype}>
                            {usertype}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
