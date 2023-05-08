import CentralList from "./CentralList";
import "./ChooseRole.css";
//import { AdminList } from "./AdminList";
import { Avatar, AvatarBadge, Stack, Box } from "@chakra-ui/core";
import { Tooltip } from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";
import { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import chosenUser, { ChooseUser } from "./ChooseRole";
import { render } from "react-dom";

/*
describe("ChooseRole Component Tests", () => {
    beforeEach(() => {
        render();
    });
}
)
*/
