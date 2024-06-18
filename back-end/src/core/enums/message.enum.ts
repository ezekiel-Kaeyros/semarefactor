export enum StandardMessageEnum {
    INCORECT_KEYWORD = "Mot clé incorrect, vous ne disposez pas du bon mot clé pour participer à cette campagne.",
    INCOMPLTE_SCENARIO = "Ce scénario est incomplet",
    END_SCENARIO = "Merci pour cette echange, ci dessous le resumé de notre echange.\n Coming soon...",
    INACTIVE_SESSION = "Cette session n'est plus en cours.",
    END_SESSION = "Session terminé."
}

export enum ChatOrigin {
    BOT = 'bot',
    ADMIN = 'admin',
    USER = 'user'
}

export enum TimeValidSession {
    WHATSAPP_VALIDITY_MINUTE = 1440,
    TIME_STOP_BOT = 10
}

export enum StandardKeyWord {
    KILL_SESSION = 'Kill'
}