import { createContext } from "react";
import { ClientUser } from "@/lib/auth";

export const UserContext = createContext<ClientUser>(null);
