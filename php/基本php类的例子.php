<?php
class deviceProfile {
    public $height;
    public $weight;
    private $sex;
    function __construct($height,$weight){
        $this->height = $height; 
        $this->setWeight($weight);
    } 
   
    public function setWeight($weight){
        $this->weight = $weight;
    }
    public function getWeight(){
        return $this->height;
    }
}
?>