//Read existing notes from LocalStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')
    try{
        if (notesJSON != null) {
            return JSON.parse(notesJSON)
        }
        else
            return []
    }
    catch(e)
    {
        return []
    }
}

//Remove a note from a list
const removeNote = function (id) {
    const noteIndex = notes.findIndex(function (note) {
        return note.id === id
    })
    if(noteIndex > -1)
    {
        notes.splice(noteIndex,1)
    }

}
//Generate DOM structure for Note
const generateNoteDOM = function (note) {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    
    //set up note title text
    if (note.title.length > 0)
    {
        textEl.textContent = note.title
    }
    else
    {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //Setup the Link
    noteEl.setAttribute('href',`/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //Setup the Status Message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

//Sort Nodes according to the fiter options selected
const sortNotes = function (notes,sortBy) {
    if(sortBy === 'byEdited')
    {
        notes.sort(function (a,b) {
            if(a.updatedAt > b.updatedAt)
                return -1
            else if (a.updatedAt < b.updatedAt)
                return 1
            else
                return 0
        })
    }
    else if(sortBy === 'byCreated')
    {
        notes.sort(function (a,b) {
            if(a.createdAt > b.createdAt)
                return -1
            else if (a.createdAt < b.createdAt)
                return 1
            else
                return 0
        })
    }
    else if (sortBy === 'Alphabetical') {
        notes.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase())
                return -1
            else if (a.title.toLowerCase() > b.title.toLowerCase())
                return 1
            else
                return 0
        })
    }
    return notes
}

//Render Application Notes
const renderNotes = function (notes, filters) {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes,filters.sortBy)
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesEl.innerHTML = ''
    if(filteredNotes.length > 0){
        filteredNotes.forEach(function (note) {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No Notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

}

//Generate Last Edited Time for Note
const generateLastEdited = function (timestamp) {
    return "Last Edited " + moment(timestamp).fromNow().toString()
}