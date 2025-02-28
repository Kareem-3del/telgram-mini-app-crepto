
export const parseNames = (userData: { firstname?: string, username?: string, lastname?: string }[]) => {
    let parsedNames: string[] = []

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



type userDataType =  { firstname?: string|undefined, username?: string|undefined, lastname?: string|undefined }

export const setUsername = (userData:userDataType) => {
    let nameString = ""

    if (userData?.firstname) {
        nameString += userData.firstname
    }

    if (userData?.lastname) {
        if (!userData.firstname) {
            nameString = userData.lastname
        } else {
            nameString += ` ${userData.firstname}` //firstname + lastname
        }
    }

    if (!userData?.firstname && !userData?.lastname) {
        if (userData?.username) {
            nameString = userData.username
        } else {
            nameString = "No name"
        }
    }
    return nameString
}

