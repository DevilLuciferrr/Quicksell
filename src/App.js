import React, { useState, useEffect } from 'react';
import './Kanban.css'

const KanbanBoard = () => {
 const [tickets, setTickets] = useState([]);
 const [users, setUsers] = useState([]);
 const [selectedGroup, setSelectedGroup] = useState('status');
 const [selectedSort, setSelectedSort] = useState('priority');
//  const [groupCounts, setGroupCounts] = useState([]);

//  useEffect(() => {
//   let newGroupCounts = [];
//   for (let group of selectedGroup) {
//      newGroupCounts.push({
//        key: group.key,
//        count: group.value.length,
//      });
//   }
//   setGroupCounts(newGroupCounts);
//  }, [selectedGroup]);


 useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await result.json();
      setTickets(data.tickets);
      setUsers(data.users);
    };

    fetchData();
 }, []);

 const renderGroupedData = () => {
    let sortedTickets = [...tickets];

    sortedTickets.sort((a, b) => {
      if (selectedSort === 'priority') {
        return b.priority - a.priority;
      } else if (selectedSort === 'title') {
        return a.title.localeCompare(b.title);
      }
    });

    const groupedTickets = sortedTickets.reduce((groups, ticket) => {
      const key = ticket[selectedGroup];
      groups[key] = groups[key] || [];
      groups[key].push(ticket);
      return groups;
    }, {});

    return (
      <div className="grouped-data">
        {Object.entries(groupedTickets).map(([key, value]) => (
          <div key={key} className="ticket-group">
            <div className="heading">
              <div className="head-con">
                <img src={
                  key==='usr-1'?'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg':
                  key==='usr-2'?'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png':
                  key==='usr-3'?'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxnj4SxLZVRypqE02NAOIPKNIFvY_A4RLbbUXx-gV5uGE81DPOcWSUPftZ8oBxeG-Mmv8&usqp=CAU'
                  :key==='usr-4'?'https://icon2.cleanpng.com/20180523/wxj/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc2ee812.2252011515270566041921.jpg'
                  :key==='usr-5'?'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
                  :key==='Todo'?'https://cdn-icons-png.flaticon.com/512/105/105152.png'
                  :key==='In progress'?'https://i.stack.imgur.com/numBd.png'
                  :key==='Backlog'?'https://cdn-icons-png.flaticon.com/512/5065/5065539.png'
                  :key==='0'?'https://icon2.cleanpng.com/20180630/ocl/kisspng-ellipsis-computer-icons-full-stop-los-angeles-5b3838addb67e9.5137632315304111818987.jpg'
                  :key==='1'?'https://static.vecteezy.com/system/resources/previews/017/172/383/original/warning-message-concept-represented-by-exclamation-mark-icon-exclamation-symbol-in-circle-png.png'
                  :key==='2'?'https://static.thenounproject.com/png/1422904-200.png'
                  :key==='3'?'https://static.thenounproject.com/png/587670-200.png'
                  :key==='4'?'https://static.thenounproject.com/png/269790-200.png'
                  :''} alt="" />
                <h2>{key==='usr-1'?'Anoop Sharma':key==='usr-2'?'Yogesh':key==='usr-3'?'Shankar Kumar':key==='usr-4'?'Ramesh':key==='usr-5'?'Suresh':key==='Todo'?'Todo':key==='In progress'?'In progress':key==='Backlog'?'Backlog':key==='0'?'No Priority':key==='1'?'Urgent':key==='2'?'High':key==='3'?'Medium':'Low'}</h2>
                {/* <p>Count: {groupCounts.find((group) => group.key === key).count}</p> */}
              </div>
              <div className="head-img">
                <img src="https://pngimg.com/d/plus_PNG100.png" alt="" />
                <img src="https://assets.stickpng.com/images/588a64e7d06f6719692a2d11.png" alt="" />
              </div>
            </div>
            {value.map((ticket) => (
              <div key={ticket.id} className="ticket">
                <div className="top">
                  <h6>{ticket.id}</h6>
                  <div className="top-img">
                    <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" alt="" />
                    <img src="https://w7.pngwing.com/pngs/980/921/png-transparent-green-dot-corporation-business-cercle-de-fermieres-d-ahuntsic-thumbnail.png" alt="" className='dot'/>
                  </div>
                </div>
                <h5>{ticket.title}</h5>
                {/* <p>Assigned to: {users.find((user) => user.id === ticket.userId).name}</p> */}
                <div className="tagg">
                  <img src="https://cdn-icons-png.flaticon.com/512/6986/6986576.png" alt="" className='imt'/>
                  <div className="tagg-2">
                    <img src="https://pngimg.com/d/dot_PNG8.png" alt="" />
                    <p>{ticket.tag}</p>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        ))}
      </div>
    );
 };

 const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
 };

 const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
 };

 return (
    <div className="kanban-board">
      <div className="filter-options">
        <div className="filter-left">
        <label htmlFor="group">Group by:</label>
        <select id="group" value={selectedGroup} onChange={handleGroupChange}>
          <option value="status">Status</option>
          <option value="userId">User</option>
          <option value="priority">Priority</option>
        </select>
        </div>
        <div className="filter-left">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={selectedSort} onChange={handleSortChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
        </div>
      </div>
      {renderGroupedData()}
    </div>
 );
};

export default KanbanBoard;