angular.module('app.controllers', [])
  
.controller('welcomeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupHtmlCtrl', ['$scope', '$stateParams', '$firebaseArray', '$state', function ($scope, $stateParams, $firebaseArray, $state) {

    $scope.data = {
        'email': '',
        'password': '',
        'usertype':''
    }

    $scope.signup = function(){
        $scope.errorBox='';

        const promise = firebase.auth().createUserWithEmailAndPassword($scope.data.email, $scope.data.password);
        promise.then(resp => {
            createUser();
                $state.go('welcome');
            }
        )

        .catch(err => {
           $scope.$apply(function(){
                //Set error box message
                $scope.errorBox = err.message;
           });
        })
    }

    //By default check the individual option
    $scope.activeSection = 1;


    //Choose Occupation type as individual or business
    $scope.choseType = function(option){
        // $scope.activeSection = option;
        // if(option == 1){
        //     $scope.data.usertype = "individual";
        // }
        // else if(option == 2){
        //     $scope.data.usertype = "restaurant";
        // }
    }

    function createUser(){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            var uid = user.uid;
            var email = user.email;
            var userType = $scope.data.usertype;
            firebase.database().ref('users/' + uid).set({
                email: email,
                user_type : userType
              });
              
          } else {
            // No user is signed in.
          }
        });
    }

}])
   
.controller('loginHtmlCtrl', ['$scope', '$stateParams', '$firebaseArray', '$state', function ($scope, $stateParams,  $firebaseArray, $state) {

    $scope.data = {
        'email': '',
        'password': ''
    }

    $scope.login = function(){
        $scope.errorBox = '';
        const promise = firebase.auth().signInWithEmailAndPassword($scope.data.email, $scope.data.password);
        promise.then(resp => {

            $state.go('welcome')
        })
        .catch(err => {
          $scope.$apply(function(){
             $scope.errorBox = err.message;
          });
        });
    }

}
 ])
   
.controller('nonEmployeesReservationCtrl', ['$scope', '$stateParams', '$filter', 
function ($scope, $stateParams , $filter) {
    
    $scope.data={
        avail : 15,
        reserveSpot : ""
    };
    
            
    
    $scope.check=function(){
        
        if ( $scope.data.avail < $scope.data.reserveSpot )
            alert("Not enough space available.")
        
    
        if ( $scope.data.avail >= $scope.data.reserveSpot )
            $scope.data={
                avail : ($scope.data.avail - $scope.data.reserveSpot),
                reserveSpot : $scope.data.reserveSpot,
            };
            
        if ( $scope.data.avail >= $scope.data.reserveSpot ){
                alert('Peope: ' + $scope.data.reserveSpot  + ' Date: ' + $scope.month + ' Time: ' + $scope.time); 
        }


    };
            



    //Date and time
    $scope.count = 1; 
    var now = new Date(); 
    var day = 0; 
    var m = 0; 
    
    function updateDate() 
    { 
    $scope.today = $filter('date')(now, 'EEEE'); 
    $scope.month = $filter('date')(now, 'dd MMMM yyyy'); 
    } 
    
    function optimizeTime() 
    { 
    if (now.getMinutes() < 30) 
    { 
    now.setMinutes(30); 
    } 
    else 
    { 
    now.setHours(now.getHours() + 1, 0); 
    } 
    } 
    
    updateDate(); 
    
    $scope.incpeople = function() 
    { 
    if ($scope.count == 10) 
    { 
    $scope.count = 1; 
    } 
    else 
    { 
    $scope.count++; 
    } 
    } 
    
    $scope.decpeople = function() 
    { 
    if ($scope.count == 1) 
    { 
    $scope.count = 10; 
    } 
    else 
    { 
    $scope.count--; 
    } 
    } 
    
    $scope.incdate = function() 
    { 
    day++; 
    now.setDate(now.getDate() + 1); 
    updateDate(); 
    } 
    
    $scope.decdate = function() 
    { 
    if (day > 0) 
    { 
    day--; 
    now.setDate(now.getDate() - 1); 
    updateDate(); 
    
    if (day === 0) 
    { 
    m = 0; 
    now = new Date(); 
    optimizeTime(); 
    $scope.time = $filter('date')(now, 'HH:mm'); 
    } 
    
    } 
    } 
    
    optimizeTime(); 
    $scope.time = $filter('date')(now, 'HH:mm'); 
    
    $scope.inctime = function() 
    { 
    m++; 
    if (now.getMinutes() < 30) 
    { 
    now.setHours(now.getHours(), 30); 
    } 
    else 
    { 
    now.setHours(now.getHours() + 1, 0); 
    } 
    
    $scope.time = $filter('date')(now, 'HH:mm'); 
    
    } 
    
    $scope.dectime = function() 
    { 
    if (day === 0) 
    { 
    if (m > 0) 
    { 
    m--; 
    if (now.getMinutes() < 30) 
    { 
    now.setHours(now.getHours() - 1, 30); 
    } 
    else 
    { 
    now.setHours(now.getHours(), 0); 
    } 
    $scope.time = $filter('date')(now, 'HH:mm'); 
    } 
    
    } 
    else 
    { 
    
    if (now.getMinutes() < 30) 
    { 
    now.setHours(now.getHours() - 1, 30); 
    } 
    else 
    { 
    now.setHours(now.getHours(), 0); 
    } 
    $scope.time = $filter('date')(now, 'HH:mm'); 
    
    } 
    
    } 
    
    // $scope.reserve = function() 
    // { 
    // alert('Peope: ' + $scope.count + ' Date: ' + $scope.month + ' Time: ' + $scope.time); 
    // } 
    
    
}



])
   
.controller('bigenSubmitDatesCtrl', ['$scope', '$stateParams', '$filter', function ($scope, $stateParams , $filter) {
    var now = new Date(); 
    var day = 0; 
    var m = 0; 
    
    function updateDate() { 
        $scope.data={
            today : $filter('date')(now, 'EEEE'),
            month : $filter('date')(now, 'dd MMMM yyyy'),
            time : $filter('date')(now, 'HH:mm')
        };
    } 
    
    function optimizeTime() { 
        if (now.getMinutes() < 30){ 
            now.setMinutes(30); 
        } 
    
            else { 
                now.setHours(now.getHours() + 1, 0); 
            } 
    } 
    
    updateDate(); 
    
    
    $scope.incdate = function() { 
        day++; 
        now.setDate(now.getDate() + 1); 
        updateDate(); 
    } ;
    
    $scope.decdate = function() { 
        if (day > 0) { 
            day--; 
            now.setDate(now.getDate() - 1); 
            updateDate(); 
        
                if (day === 0) { 
                    m = 0; 
                    now = new Date(); 
                    optimizeTime(); 
                
                
                        $scope.data={
                            time : $filter('date')(now, 'HH:mm'),
                            today : $filter('date')(now, 'EEEE'),
                            month : $filter('date')(now, 'dd MMMM yyyy')
                        } ;
            
                } 
        
        } 
    }; 
    
    optimizeTime(); 
    
    $scope.data={
        time : $filter('date')(now, 'HH:mm'),
        today : $filter('date')(now, 'EEEE'),
        month : $filter('date')(now, 'dd MMMM yyyy')
                            
    } ;
    
    
    $scope.inctime = function() { 
    m++; 
        if (now.getMinutes() < 30) { 
        now.setHours(now.getHours(), 30); 
        } 
            else { 
            now.setHours(now.getHours() + 1, 0); 
            } 
    
                   $scope.data={
                        time : $filter('date')(now, 'HH:mm'),
                        today : $filter('date')(now, 'EEEE'),
                        month : $filter('date')(now, 'dd MMMM yyyy')
                    } ;
    } ;
    
    
    $scope.dectime = function() { 
        
        if (day === 0) { 
            
            if (m > 0) { 
            m--; 
            
                if (now.getMinutes() < 30) { 
                now.setHours(now.getHours() - 1, 30); 
                } 
                    
                    else { 
                    now.setHours(now.getHours(), 0); 
                    } 

                        $scope.data={
                            time : $filter('date')(now, 'HH:mm'),
                            today : $filter('date')(now, 'EEEE'),
                            month : $filter('date')(now, 'dd MMMM yyyy')
                        } ;
            
            
            
            } 
        
        } 
        
        
        else { 
        
            if (now.getMinutes() < 30) { 
                now.setHours(now.getHours() - 1, 30); 
            } 
                else { 
                now.setHours(now.getHours(), 0); 
                } 
        
                    $scope.data={
                        time : $filter('date')(now, 'HH:mm'),
                        today : $filter('date')(now, 'EEEE'),
                        month : $filter('date')(now, 'dd MMMM yyyy')
                    } ;

        } 
    } ;
    
}



])
   
.controller('bigenDateConfirmationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    
$scope.data={
        reserveSpot : $stateParams.reserveSpot,
        today : $stateParams.today,
        month : $stateParams.month,
        time : $stateParams.time ,
    };

}])
   
.controller('page10Ctrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
    $scope.showDelete = false ;
    
    $scope.delete = function(item){
        $scope.items.splice($scope.items.indexOf(item), 1);
    };
    
    $scope.toggle=function(v){
      $scope[v]=!$scope[v];
    };

        $scope.items=[
            
            { id : '1'},
            { id : '2'},
            { id : '3'}
            
            // {{data.month}} {{data.time}} {{data.reserveSpot}} seats{{data.today}} 
            // or
            // {{item.id}}
        ];
        
        
        $scope.data={
                reserveSpot : $stateParams.reserveSpot,
                today : $stateParams.today,
                month : $stateParams.month,
                time : $stateParams.time ,
            };
        
}])
 