function fetchIssues () {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  if(issues){
    var test = issues.length;
  }

  for (var i = 0; i < test; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well col-md-4">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<a id="'+ id +'" onclick="modify(\''+id+'\')"><h3>' + desc + '</h3></a>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                              '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" class="btn btn-success" onclick="updateIssue(\''+id+'\')">Update</a> '+
                              '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                              '</div>';
  }
}
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
function saveIssue(e) {
  var issueId = chance.guid();
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueStatus = 'Open';
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}


function updateIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var statusupdate =  document.getElementById('modal-body');
  statusupdate.innerHTML += '';
  var text = 'Already updated';
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      if(issues[i].status == "Updated") {
        var openModal = document.getElementById('myModal');
        openModal.classList.remove("fade");
        openModal.style.display = 'block';
        statusupdate.innerHTML += text;

      } else {
        issues[i].status = "Updated";
      }
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function modify(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      if(issues[i].description == issues[i].description ) {
        var openModal = document.getElementById('myModal');
        var h3value = document.getElementById(id);
        var geth3 = h3value.innerHTML;
      }
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

function closePopup() {
    var closeModal = document.getElementById('myModal');
    closeModal.style.display = 'none';
}
