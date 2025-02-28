
export const parseNames = (userData: { firstname?: string, username?: string, lastname?: string }[]) => {
    let parsedNames:string[] = []

    userData.forEach((e) => {
        let nameString = ""

        if (e?.firstname) {
            nameString += e.firstname
        }

        if (e?.lastname) {
            if (!e.firstname) {
                nameString = e.lastname
            } else {
                nameString += ` ${e.firstname}` //firstname + lastname
            }
        }

        if (!e?.firstname && !e?.lastname) {
            if (e?.username) {
                nameString = e.username
            } else {
                nameString = "No name"
            }
        }
        parsedNames.push(nameString)
    })
    return parsedNames
}

