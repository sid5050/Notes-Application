let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes,filters)

document.querySelector('#create-note').addEventListener('click',function (e) {
    const noteid = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: noteid,
        title:'',
        body:'',
        createdAt: timestamp,
        updatedAt: timestamp
    })  
    localStorage.setItem('notes',JSON.stringify(notes))
    location.assign(`/edit.html#${noteid}`)
})


document.querySelector('#search-text').addEventListener('input',function (e) {
    // console.log(e.target.value)
    filters.searchText = e.target.value
    renderNotes(notes,filters)
})


document.querySelector('#filter-by').addEventListener('change',function (e) {
    // console.log(e.target.value)
    filters.sortBy = e.target.value
    renderNotes(notes,filters)
})

window.addEventListener('storage',function (e) {
    if(e.key === 'notes')
    {
        notes = JSON.parse(e.newValue)
    }
    renderNotes(notes,filters)
})

/*BASIC MOMENT COMMANDS*/
// const now = moment()
// console.log(now.toString())

// now.subtract(1,'week').subtract(20,'days')
// console.log(now.format('MMMM Do, YYYY'))
// console.log(now.fromNow())
// console.log(now.valueOf())
// console.log(moment(now.valueOf()).toString())